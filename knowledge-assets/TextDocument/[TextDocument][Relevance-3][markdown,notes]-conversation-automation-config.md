# Fae Conversations Automation Configuration

**Source:** `/home/rosie/projects/fae-conversations/automation/automation_config.json`

This document outlines the configuration for the automated processing of Fae Intelligence conversations, including data sources, processing steps, and output settings.

## Overview

- **Automation Name:** `fae_conversations_automation`
- **Description:** Automation for processing FAE conversations and generating insights
- **Version:** `1.0.0`
- **Enabled:** `true`
- **Schedule:**
    - **Frequency:** `daily`
    - **Time:** `02:00`

## Data Sources

- **Type:** `local_filesystem`
- **Path:** `/home/rosie/projects/fae-conversations/chunks`
- **Description:** Local directory where Claude discussions are broken down into chunks.

## Processing Steps

### 1. `extract_conversations`
- **Type:** `data_extraction`
- **Parameters:**
    - `file_format`: `json`
    - `max_files_per_run`: `100`
    - `chunk_size_kb`: `700`
    - `overlap_size_kb`: `100`

### 2. `analyze_sentiment`
- **Type:** `sentiment_analysis`
- **Parameters:**
    - `model_name`: `gemini-1.5-flash`
    - `sentiment_types`: `positive`, `negative`, `neutral`, `mixed`, `critical`, `supportive`
    - `thresholds`: `positive: 0.7`, `negative: 0.7`
    - `output_detail_level`: `sentence_level`
    - `instruction_prompt_template`: "Analyze the sentiment of the following conversation text specifically in relation to project progress, client feedback, or internal team morale for Fae Intelligence. Categorize it as positive, negative, neutral, or mixed. Provide a confidence score and extract key phrases indicating sentiment relevant to our business needs."

### 3. `generate_insights`
- **Type:** `insight_generation`
- **Parameters:**
    - `insight_types`: `trends`, `issues`, `feedback`, `action_items`, `strategic_implications`, `tool_specific_insights`, `project_specific_needs`, `business_opportunities`, `operational_efficiency`, `client_engagement`, `technical_challenges`, `learning_points`
    - `model_name`: `gemini-1.5-flash`
    - `instruction_prompt_template`: "Based on the conversation summaries, identify emerging trends, critical issues, common feedback themes, and clear action items. Crucially, relate these insights directly to Fae Intelligence's business, specific projects, and the tools/technologies mentioned (e.g., BlogWriter, KATA, Jetson, MCP, elroy, multi-agent). Infer any strategic implications relevant to our organizational and project needs, suggest new projects or improvements where applicable, and categorize insights into specific areas like tool usage, project-specific needs, business opportunities, or technical challenges."
    - `min_trend_occurrences`: `5`
    - `output_format`: `markdown`
    - `enable_dynamic_categorization`: `false`
    - `dynamic_categorization_instruction`: "Identify and propose new, relevant categories for insights based on the conversation content, beyond the predefined types."

## Global Settings

- **Base Directory:** `/home/rosie/projects/fae-conversations`
- **GCP Project ID:** `faeintelligence`
- **GCP Region:** `us-central1`
- **Gemini Model Name:** `gemini-1.5-flash`

## Output Settings

- `create_summaries`: `true`
- `generate_reports`: `true`
- `update_knowledge_base`: `true`
- `create_search_index`: `true`

## Notification Settings

- `log_processing_results`: `true`
- `alert_on_errors`: `true`
- `create_status_reports`: `true`
