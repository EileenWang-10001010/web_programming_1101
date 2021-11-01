import React from 'react';

const Footer = ({toDoList,handleFilter ,handleAll,handleActive,handleCompleted})=>{

    const hiddenFooter = toDoList.length===0? "hidden":"visible";

    const numOfLeft=({toDoList})=>{
        let copy= toDoList.filter(task=>{return !task.complete});
        return(copy.length);
    }

const numOfTodo = numOfLeft(toDoList={toDoList});

//const handleButton=(e)=>{
 //alert(e.target.innerHTML);
 //setButton(e.target.innerHTML);
//}

    return(
        <footer class="todo-app__footer" id="todo-footer" style={{visibility:hiddenFooter}}>
                <div class="todo-app__total">{numOfTodo} left</div>
                
                <ul class="todo-app__view-buttons">
                    <button onClick={handleAll} >All</button>
                    <button onClick={handleActive}>Active</button>
                    <button onClick={handleCompleted}>Completed</button>
                </ul>
                <div class="todo-app__clean">
                    <button onClick={handleFilter}>Clear completed</button>
                </div>
            </footer>
    )
}
export default Footer;