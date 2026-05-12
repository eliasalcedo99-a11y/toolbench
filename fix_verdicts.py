import os
import re
import random
import glob

def get_variant(tool_a, tool_b, file_path):
    # Use the file path hash to pick a consistent variant
    random.seed(file_path)
    variant_idx = random.randint(1, 4)
    
    if variant_idx == 1:
        return f"While both {tool_a} and {tool_b} offer robust capabilities, {tool_a} stands out for its comprehensive feature set and overall performance. However, {tool_b} is a highly capable alternative that may better suit teams with strict budget requirements."
    elif variant_idx == 2:
        return f"In our analysis, {tool_a} takes the lead due to its superior output quality and extensive ecosystem. On the other hand, {tool_b} provides an excellent price-to-value ratio, making it an attractive option for cost-conscious users."
    elif variant_idx == 3:
        return f"For users demanding the highest level of integration and quality, {tool_a} is the clear winner in this comparison. {tool_b} remains a strong contender, particularly for those who prioritize affordability over advanced edge-case features."
    else:
        return f"When comparing {tool_a} and {tool_b}, we found that {tool_a} generally delivers better performance and versatility. {tool_b} still holds its ground as a reliable, budget-friendly solution for everyday tasks."

def process_files(pattern):
    files = glob.glob(pattern)
    modified = 0
    
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract verdict to see if it matches the boilerplate
        match = re.search(r'verdict:\s*"([^"]*edges ahead on overall quality[^"]*)"', content)
        if not match:
            continue
            
        old_verdict = match.group(1)
        
        # Extract the tool names from the old verdict
        # Format: "ToolA edges ahead... ToolB remains competitive..."
        tools_match = re.search(r'^(.+?) edges ahead.*?\.\s*(.+?) remains competitive', old_verdict)
        if tools_match:
            tool_a_name = tools_match.group(1)
            tool_b_name = tools_match.group(2)
        else:
            # Fallback, just try to use the filenames or something
            continue
            
        new_verdict = get_variant(tool_a_name, tool_b_name, filepath)
        
        new_content = content.replace(f'verdict: "{old_verdict}"', f'verdict: "{new_verdict}"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        modified += 1
        
    print(f"Modified {modified} files.")

if __name__ == '__main__':
    pattern = 'c:/Users/elias/Desktop/toolbench/toolbench-site/src/content/comparisons/*.md'
    process_files(pattern)
