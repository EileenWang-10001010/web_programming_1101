import React from 'react';
import ToDo from './ToDo';

   const ToDoList = ({toDoList, handleToggle, handleFilter,handleX}) => {

    return (
        <div >
            {toDoList.map(todo => {

                return (
       <ToDo todo={todo} 
       handleToggle={handleToggle} 
       handleFilter={handleFilter} 
       handleX={handleX}
       />
       )
            })}
        
        </div>
    );
};

export default ToDoList;