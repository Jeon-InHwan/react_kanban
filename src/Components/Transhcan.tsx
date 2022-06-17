import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import trashcan from "../pics/trashcan.png";
import { useRecoilValue } from "recoil";
import { TrashCanState } from "../atoms";

const TrashImage = styled.img`
  width: 100px;
  height: 100px;
`;

const DeleteArea = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Trashcan() {
  const trashCan = useRecoilValue(TrashCanState);

  return (
    <Droppable droppableId="trashcan">
      {(provided) => (
        <DeleteArea ref={provided.innerRef} {...provided.droppableProps}>
          {trashCan && <TrashImage src={trashcan} />}
        </DeleteArea>
      )}
    </Droppable>
  );
}

export default Trashcan;
