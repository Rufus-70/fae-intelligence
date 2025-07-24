# Overlap-Aware Analysis Workflow

**Source:** `/home/rosie/projects/fae-conversations/analysis_workflow.md`

## Chunk Processing Order
1. Process chunks sequentially: chunk_001, chunk_002, chunk_003...
2. Detect overlap regions between adjacent chunks
3. Extract unique content from each chunk
4. Reconstruct complete conversations from fragments
5. Deduplicate overlapping content

## Key Benefits
- ✅ No split conversations (overlap prevents fragmentation)
- ✅ Complete context preservation (related messages stay together)
- ✅ Error recovery (overlap provides redundancy)
- ✅ Better analysis accuracy (full conversation context)

## Next Steps
1. Use analysis tool to process first chunk
2. Understand JSON conversation structure
3. Develop overlap detection algorithm
4. Extract high-value conversations systematically
