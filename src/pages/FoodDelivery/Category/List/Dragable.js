import React from "react"
import PropTypes from "prop-types"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { map } from "lodash"

const Dragable = ({ onDragEnd, droppableId, items, renderItem }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items &&
              map(items, (category, index) => (
                <Draggable
                  key={category._id}
                  draggableId={category._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={provided.draggableProps.style}
                    >
                      {renderItem({ category, index, provided })}
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

Dragable.propTypes = {
  onDragEnd: PropTypes.func,
  droppableId: PropTypes.string,
  items: PropTypes.array,
  renderItem: PropTypes.func,
}

export default Dragable
