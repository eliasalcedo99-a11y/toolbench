import glob
import re

def process_noindex(pattern):
    files = glob.glob(pattern)
    modified = 0
    
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # If it already has noindex, skip
        if 'noindex:' in content:
            continue
            
        # Check if it has the boilerplate
        if 'serve fundamentally different use cases' not in content:
            continue
            
        # We need to insert `noindex: true` right after `toolB: "..."`
        # Using a simple string replace for toolB match
        match = re.search(r'(toolB:\s*".*?")', content)
        if match:
            original = match.group(1)
            replacement = original + '\nnoindex: true'
            new_content = content.replace(original, replacement, 1)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            modified += 1
            
    print(f"Added noindex: true to {modified} files.")

if __name__ == '__main__':
    import os
    here = os.path.dirname(os.path.abspath(__file__))
    pattern = os.path.join(here, '..', 'src', 'content', 'comparisons', '*.md')
    process_noindex(pattern)
