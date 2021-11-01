
import React from 'react';
import x from './img/x.png';

const ToDo = ({todo, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id);


    }

    return (
        
        <li class="todo-app__item" 
        
        >
            <div class="todo-app__checkbox">
           <input type="checkbox" id={todo.id} onClick={handleClick}/>
           <label for={todo.id}></label>
           </div>
        <h1 class="todo-app__item-detail"  
        key={todo.id + todo.task} 
        name="todo" value={todo.id}  
        className={todo.complete ? "todo strike" : "todo"}>
            {todo.task}
        </h1>
        <img src={x} alt="x img" class="todo-app__item-x" />
        </li>
    );
};

export default ToDo;