import React from "react";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState, TrashCanState } from "./atoms";
import Board from "./Components/Board";
import Trashcan from "./Components/Transhcan";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const setTrashCan = useSetRecoilState(TrashCanState);
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === "DEFAULT") setTrashCan(true);
  };

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    setTrashCan(false);
    if (!destination) {
      return;
    }

    console.log(destination.droppableId);

    if (destination.droppableId === "trashcan") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete the target item on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back the target item on desination.index
        boardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
      <Trashcan></Trashcan>
    </DragDropContext>
  );
}

export default App;
