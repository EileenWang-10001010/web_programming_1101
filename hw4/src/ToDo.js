
import React  from 'react';
import x from './img/x.png';

const ToDo = ({todo, handleToggle,handleX}) => {

    //const handleClick = (e) => {
    //    e.preventDefault();
    //    handleToggle(todo.id);
        //console.log(e.target.htmlFor);
        //handleToggle(e.currentTarget.id);
        //console.log(e.target.parentNode.parentNode);

        //let todoItem = e.target.parentNode.parentNode;
        
        //if(!todo.complete){
        //    todoItem.childNodes[0].childNodes[0].checked=true;
        //}
        //else{
        //    todoItem.childNodes[0].childNodes[0].checked=false;
        //}
    //}


    //const handleXbutton =(e) =>{
    //    alert(e.target.parentNode.childNodes[0].innerHTML);
    //    handleX(e.target.parentNode.childNodes[0].id);
    //}



    const  complete = todo.complete ? "todo strike" : "todo";
    const background = todo.complete ? "#26ca299b" : "rgba(99, 99, 99, 0.698)";

    return (
        
        <li className="todo-app__item" style={{visibility:todo.visibility},{display:todo.display}}>
            <div className="todo-app__checkbox" id={todo.id}  >
             <input className="input" type="checkbox"  defaultChecked={false}></input>
             <label htmlFor={todo.id}  onClick={()=>{handleToggle(todo.id)}} style={{backgroundColor:background}}></label>
           </div>
        <h1 className="todo-app__item-detail"  
        key={todo.id } //+ todo.task
        name="todo" value={todo.id}  
        className={complete}>
            {todo.task}
        </h1>
        <img src={x} alt="x img" class="todo-app__item-x" onClick={() => {handleX(todo.id)}}/>
        </li>
    );
};

export default ToDo;