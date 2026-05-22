"""Generate data-driven verdicts for indexable comparisons.

For each comparison without `noindex: true`, looks up the two tools' scores
(price, ease, quality, integrations, support) and rewrites the `verdict:`
frontmatter field with a contextual sentence derived from the actual gaps
in those scores plus the tool ratings.

Idempotent: replaces any existing verdict whose body contains one of the
known boilerplate phrases. Leaves manually-authored verdicts alone unless
the `--force` flag is passed.
"""

import os
import re
import glob
import random

HERE = os.path.dirname(os.path.abspath(__file__))
TOOLS_DIR = os.path.join(HERE, '..', 'src', 'content', 'tools')
COMPARES_DIR = os.path.join(HERE, '..', 'src', 'content', 'comparisons')

DIMENSION_LABELS = {
    'price': 'value for money',
    'ease': 'ease of use',
    'quality': 'output quality',
    'integrations': 'integrations',
    'support': 'support',
}

# Phrases the boilerplate fix_verdicts pass (or its predecessor) generated.
# A verdict containing any of these is considered template-generated and safe
# to overwrite.
BOILERPLATE_MARKERS = (
    'edges ahead on overall quality',
    'stands out for its comprehensive feature set',
    'takes the lead due to its superior output quality',
    'is the clear winner in this comparison',
    'generally delivers better performance and versatility',
    'serve fundamentally different use cases',  # the cross-category boilerplate
)


def parse_frontmatter(text: str) -> dict:
    """Return a flat dict of scalar frontmatter fields. Skips nested blocks."""
    m = re.match(r'---\s*\n(.*?)\n---', text, re.S)
    if not m:
        return {}
    out = {}
    for line in m.group(1).split('\n'):
        if not line or line.startswith(' ') or line.startswith('-'):
            continue
        kv = re.match(r'^(\w+):\s*(.*)$', line)
        if not kv:
            continue
        key, val = kv.group(1), kv.group(2).strip()
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        out[key] = val
    return out


def parse_scores(text: str) -> dict:
    """Extract the `scores:` block (5 numeric children) from a tool .md."""
    m = re.search(r'^scores:\s*\n((?:\s+\w+:\s*\d+\s*\n)+)', text, re.M)
    if not m:
        return {}
    out = {}
    for line in m.group(1).split('\n'):
        kv = re.match(r'\s+(\w+):\s*(\d+)', line)
        if kv:
            out[kv.group(1)] = int(kv.group(2))
    return out


def load_tool(slug: str) -> dict | None:
    path = os.path.join(TOOLS_DIR, f'{slug}.md')
    if not os.path.exists(path):
        return None
    text = open(path, encoding='utf-8').read()
    fm = parse_frontmatter(text)
    scores = parse_scores(text)
    return {'slug': slug, 'name': fm.get('name', slug), 'rating': float(fm.get('rating', '0')),
            'priceLabel': fm.get('priceLabel', ''), 'scores': scores}


def build_verdict(tool_a: dict, tool_b: dict, slug_seed: str) -> str:
    """Return a 2-sentence verdict derived from the score gaps."""
    rng = random.Random(slug_seed)
    a_scores = tool_a['scores']
    b_scores = tool_b['scores']
    if not a_scores or not b_scores:
        return ''
    # Per-dimension gap, signed (positive = A leads, negative = B leads)
    gaps = {dim: a_scores.get(dim, 0) - b_scores.get(dim, 0) for dim in DIMENSION_LABELS}
    a_wins = sorted([(dim, g) for dim, g in gaps.items() if g > 0], key=lambda x: -x[1])
    b_wins = sorted([(dim, -g) for dim, g in gaps.items() if g < 0], key=lambda x: -x[1])

    a_overall = sum(a_scores.values()) / max(len(a_scores), 1)
    b_overall = sum(b_scores.values()) / max(len(b_scores), 1)
    a_lead_overall = a_overall - b_overall

    # Decide overall winner. Use 2.5pt tie band.
    if abs(a_lead_overall) < 2.5:
        winner, loser = (tool_a, tool_b) if rng.random() < 0.5 else (tool_b, tool_a)
        winner_dims = a_wins if winner is tool_a else b_wins
        loser_dims = b_wins if winner is tool_a else a_wins
        opener = f"{tool_a['name']} and {tool_b['name']} land close in our scoring"
        if winner_dims and loser_dims:
            return (f"{opener} — {winner['name']} leads on "
                    f"{DIMENSION_LABELS[winner_dims[0][0]]} ({a_scores[winner_dims[0][0]] if winner is tool_a else b_scores[winner_dims[0][0]]}/100), "
                    f"while {loser['name']} edges it on "
                    f"{DIMENSION_LABELS[loser_dims[0][0]]} ({b_scores[loser_dims[0][0]] if winner is tool_a else a_scores[loser_dims[0][0]]}/100). "
                    f"Pick based on which dimension matters more for your workflow.")
        return f"{opener}; the better pick depends on which feature matters most for your workflow."

    winner = tool_a if a_lead_overall > 0 else tool_b
    loser = tool_b if winner is tool_a else tool_a
    winner_dims = a_wins if winner is tool_a else b_wins
    loser_dims = b_wins if winner is tool_a else a_wins
    winner_scores = a_scores if winner is tool_a else b_scores
    loser_scores = b_scores if winner is tool_a else a_scores

    # Pick the biggest gap dimension where the winner leads.
    if winner_dims:
        w_dim, w_gap = winner_dims[0]
        w_phrase = (f"{winner['name']} pulls ahead on "
                    f"{DIMENSION_LABELS[w_dim]} ({winner_scores[w_dim]}/100 vs {loser_scores[w_dim]}/100)")
    else:
        w_phrase = f"{winner['name']} comes out ahead overall"

    # And the dimension where the loser still leads (if any) — keeps it fair.
    if loser_dims:
        l_dim, _ = loser_dims[0]
        l_phrase = (f"{loser['name']} still wins on "
                    f"{DIMENSION_LABELS[l_dim]} ({loser_scores[l_dim]}/100)")
    else:
        l_phrase = f"{loser['name']} trails across the board"

    closers = [
        f"Pick {winner['name']} unless {DIMENSION_LABELS[loser_dims[0][0]] if loser_dims else 'price'} is your top constraint.",
        f"Default to {winner['name']}; {loser['name']} only makes sense when {DIMENSION_LABELS[loser_dims[0][0]] if loser_dims else 'budget'} dominates your decision.",
        f"{winner['name']} is the safer bet for most teams; {loser['name']} wins for buyers prioritising {DIMENSION_LABELS[loser_dims[0][0]] if loser_dims else 'cost'}.",
    ]
    closer = rng.choice(closers)

    return f"{w_phrase}, while {l_phrase}. {closer}"


def is_template_verdict(verdict_text: str) -> bool:
    return any(m in verdict_text for m in BOILERPLATE_MARKERS)


def process(force: bool = False) -> None:
    files = sorted(glob.glob(os.path.join(COMPARES_DIR, '*.md')))
    rewritten = 0
    skipped_template_kept = 0
    skipped_missing_tool = 0
    skipped_noindex = 0
    skipped_no_scores = 0

    for path in files:
        text = open(path, encoding='utf-8').read()
        fm = parse_frontmatter(text)

        if fm.get('noindex') == 'true':
            skipped_noindex += 1
            continue

        m = re.search(r'^verdict:\s*"(.*?)"\s*$', text, re.M | re.S)
        if not m:
            continue
        current = m.group(1)

        if not force and not is_template_verdict(current):
            skipped_template_kept += 1
            continue

        tool_a = load_tool(fm.get('toolA', ''))
        tool_b = load_tool(fm.get('toolB', ''))
        if not tool_a or not tool_b:
            skipped_missing_tool += 1
            continue

        new_verdict = build_verdict(tool_a, tool_b, slug_seed=os.path.basename(path))
        if not new_verdict:
            skipped_no_scores += 1
            continue

        new_text = text[:m.start(1)] + new_verdict + text[m.end(1):]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        rewritten += 1

    print(f'Rewrote {rewritten} verdict(s).')
    print(f'  Skipped (already custom)   : {skipped_template_kept}')
    print(f'  Skipped (noindex)          : {skipped_noindex}')
    print(f'  Skipped (missing tool ref) : {skipped_missing_tool}')
    print(f'  Skipped (no scores)        : {skipped_no_scores}')


if __name__ == '__main__':
    import sys
    process(force='--force' in sys.argv)
