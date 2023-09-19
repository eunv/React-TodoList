import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

export default function Lists({ todoData, setTodoData }) {



  const handleEnd = (result) => {
    //목적지가 없으면(이벤트 취소) 함수 종료
    if(!result.destination) return;

    //리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    //변경시키는 아이템을 배열에서 지우고 return 값으로 지워진 아이템 잡기
    const [reorderedItem] = newTodoData.splice(result.source.index,1);

    //원하는 자리에 reorderItem을 insert 해줌
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);

  };

  return (


    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {
                todoData.map((data, index) => (
                  <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}

                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div >
  )
}