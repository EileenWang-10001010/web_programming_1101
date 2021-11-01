
import React from 'react';
import x from './img/x.png';

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id);
    }

    const  complete = todo.complete ? "todo strike" : "todo";
    const background = todo.complete ? "#26ca299b" : "rgba(99, 99, 99, 0.698)";

    return (
        
        <li class="todo-app__item" >
            <div class="todo-app__checkbox" >
           <input type="checkbox" 
           id={todo.id} 
           onClick={handleClick} 
            />
           <label htmlFor={todo.id}  style={{backgroundColor:background,}}></label>
           </div>
        <h1 class="todo-app__item-detail"  
        key={todo.id + todo.task} 
        name="todo" value={todo.id}  
        className={complete}>
            {todo.task}
        </h1>
        <img src={x} alt="x img" class="todo-app__item-x" />
        </li>
    );
};

export default ToDo;