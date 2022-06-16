import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo will check for two props (index, toDo)
// And will re-render only the DraggableCard whose props have been changed
export default React.memo(DraggableCard);
