'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { BlogBlock } from '@/types/blog'

interface VisualEditorProps {
  blocks: BlogBlock[]
  onChange: (blocks: BlogBlock[]) => void
}

export default function VisualEditor({ blocks, onChange }: VisualEditorProps) {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="blocks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {blocks.map((block, index) => (
              <Draggable key={block.id} draggableId={block.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 border rounded-lg bg-white shadow-sm transition-shadow ${
                      snapshot.isDragging ? 'shadow-lg' : ''
                    }`}
                  >
                    <div className="font-bold">{block.type}</div>
                    <div>{block.content}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
