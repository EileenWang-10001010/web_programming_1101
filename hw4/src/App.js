import React, { Component } from 'react';
import { useState } from 'react';
import  './styles.css';
import ToDoList from './ToDoList';
import AddTodos from './AddTodos';
import Footer from './Footer';

function App() {
  //initial list item

  const [ toDoList, setToDoList ] = useState([]);
  const[button, setButton]=useState(toDoList);
  const [showFooter, setShowFooter]=useState(false);


  // when you click on the task button =>  switch to comleted state or not
  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  //when you click on the "clear completed"=> filter out the completed

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
     }
  const handleCompleted=()=>{
    let buttons = toDoList.filter(task => {
      return task.complete;
    });
    setButton(buttons);
  }

  const addTask = (KeyboardInput) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: KeyboardInput, complete: false }];
    setToDoList(copy);
  }

  const numOfLeft=()=>{
    let copy= toDoList.map(task=>{return task.complete});
    //alert(copy.length);
    return(copy.length);
}
 
  return (

    <div id="root" class="todo-app__root">
        <header class="todo-app__header">
        <h1 class="todo-app__title">todos</h1>
        </header>
       

            <section class="todo-app__main">
               
                <ul class="todo-app__list" id="todo-list">
                <AddTodos addTask={addTask} />
                <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
                </ul>
            </section>
            <Footer toDoList={toDoList} handleFilter={handleFilter} />
            </div>
  );
}

export default App;
