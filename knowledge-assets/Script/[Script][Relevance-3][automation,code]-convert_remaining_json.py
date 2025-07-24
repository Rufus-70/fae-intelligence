#!/usr/bin/env python3
"""
Convert the remaining JSON files that weren't processed
"""

import json
import os
from pathlib import Path

def convert_json_to_markdown(json_data, filename):
    """Convert JSON video analysis to structured markdown"""
    
    md_content = []
    
    # Header
    md_content.append(f"# {json_data.get('videoTitle', 'Video Analysis')}")
    md_content.append(f"**Source:** {filename}")
    md_content.append(f"**Video URL:** {json_data.get('videoUrl', 'N/A')}")
    md_content.append(f"**Analysis Date:** {json_data.get('analysisTimestamp', 'N/A')}")
    md_content.append("")
    
    # Core Topics
    if 'coreTopicsDiscussed' in json_data:
        md_content.append("## Core Topics Discussed")
        for topic in json_data['coreTopicsDiscussed']:
            md_content.append(f"- {topic}")
        md_content.append("")
    
    # Advocated Processes (GOLDMINE CONTENT)
    if 'advocatedProcesses' in json_data:
        md_content.append("## Business Processes & Implementation Guides")
        
        for i, process in enumerate(json_data['advocatedProcesses'], 1):
            md_content.append(f"### Process {i}: {process.get('processName', 'Unnamed Process')}")
            md_content.append(f"**Description:** {process.get('processDescription', 'N/A')}")
            md_content.append("")
            
            # Target Audience
            if 'targetAudience' in process:
                md_content.append("**Target Audience:**")
                for audience in process['targetAudience']:
                    md_content.append(f"- {audience}")
                md_content.append("")
            
            # Step-by-step guide
            if 'stepByStepGuide' in process:
                md_content.append("**Implementation Steps:**")
                for step in process['stepByStepGuide']:
                    step_num = step.get('stepNumber', 'N/A')
                    action = step.get('action', 'N/A')
                    details = step.get('detailsAndConsiderations', 'N/A')
                    tools = ', '.join(step.get('toolsMentioned', []))
                    time_effort = step.get('estimatedTimeOrEffort', 'N/A')
                    
                    md_content.append(f"{step_num}. **{action}**")
                    md_content.append(f"   - Details: {details}")
                    if tools:
                        md_content.append(f"   - Tools: {tools}")
                    md_content.append(f"   - Time/Effort: {time_effort}")
                    md_content.append("")
            
            # Benefits and Savings
            if 'userBenefitsAndSavings' in process:
                benefits = process['userBenefitsAndSavings']
                md_content.append("**Quantitative Benefits:**")
                if 'quantitativeSavings' in benefits:
                    for saving in benefits['quantitativeSavings']:
                        metric = saving.get('metric', 'N/A')
                        value = saving.get('value', 'N/A')
                        context = saving.get('context', 'N/A')
                        md_content.append(f"- {metric}: {value} - {context}")
                
                if 'qualitativeBenefits' in benefits:
                    md_content.append("**Qualitative Benefits:**")
                    for benefit in benefits['qualitativeBenefits']:
                        md_content.append(f"- {benefit}")
                md_content.append("")
    
    # FAE INTELLIGENCE STRATEGIC INSIGHTS (GOLDMINE!)
    if 'faeIntelligenceStrategicInsights' in json_data:
        fae_insights = json_data['faeIntelligenceStrategicInsights']
        md_content.append("## Fae Intelligence Strategic Analysis")
        
        if 'operationalWisdomIntegrationPoints' in fae_insights:
            md_content.append("### Operational Wisdom Integration")
            for insight in fae_insights['operationalWisdomIntegrationPoints']:
                md_content.append(f"- {insight}")
            md_content.append("")
        
        if 'aiApplicationAngles' in fae_insights:
            md_content.append("### AI Application Opportunities")
            for angle in fae_insights['aiApplicationAngles']:
                md_content.append(f"- {angle}")
            md_content.append("")
        
        if 'alignmentWithFaeMission' in fae_insights:
            md_content.append("### Alignment with Fae Intelligence Mission")
            md_content.append(fae_insights['alignmentWithFaeMission'])
            md_content.append("")
    
    # General Summary
    if 'generalVideoSummary' in json_data:
        md_content.append("## Video Summary")
        md_content.append(json_data['generalVideoSummary'])
        md_content.append("")
    
    return '\n'.join(md_content)

def main():
    # Files that need conversion
    remaining_files = [
        "Gemini's real power2.json",
        "AI Agent from a PDF using Function Calling.json", 
        "sD7z46Q7s_E.json"
    ]
    
    print("🔄 Converting remaining JSON files...")
    
    converted_count = 0
    
    for json_file in remaining_files:
        try:
            if not os.path.exists(json_file):
                print(f"❌ File not found: {json_file}")
                continue
                
            # Read JSON file
            with open(json_file, 'r', encoding='utf-8') as f:
                json_data = json.load(f)
            
            # Convert to markdown
            markdown_content = convert_json_to_markdown(json_data, json_file)
            
            # Generate output filename
            base_name = os.path.splitext(json_file)[0]
            safe_name = base_name.replace("'", "").replace(" ", "_")
            output_file = f"{safe_name}_analysis.md"
            
            # Write markdown file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            print(f"✅ Converted: {json_file} -> {output_file}")
            converted_count += 1
            
        except Exception as e:
            print(f"❌ Error processing {json_file}: {str(e)}")
    
    print(f"\n🎉 Converted {converted_count} remaining JSON files!")
    print("📝 Next step: These markdown files can now be ingested into your RAG system")

if __name__ == "__main__":
    main()
