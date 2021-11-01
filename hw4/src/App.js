import React from 'react';
import { useState , useRef} from 'react';
import  './styles.css';
import ToDoList from './ToDoList';
import AddTodos from './AddTodos';
import Footer from './Footer';

function App() {
  //initial list item
  const [ toDoList, setToDoList ] = useState([]);

  const id = useRef(1);

    const  handleX=(id)=> {
      setToDoList(toDoList.filter(task => task.id !== Number(id)));
    }

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


     const handleAll=()=>{
      let mapped = toDoList.map(task => {
        return task.complete ? { ...task, visibility: "visible",display: "flex" } : { ...task, visibility: "visible",display: "flex" };
      });
      setToDoList(mapped);
     }

     const handleActive=()=>{
      let mapped = toDoList.map(task => {
        return task.complete ? { ...task, display: "none",visibility: "visible" } : { ...task, visibility: "visible",display: "flex" };
      });
      setToDoList(mapped);
     }

     const handleCompleted=()=>{
      let mapped = toDoList.map(task => {
        return task.complete ? { ...task, visibility: "visible",display: "flex" } : { ...task, display: "none",visibility: "visible" };
      });
      setToDoList(mapped);
     }

  const addTask = (KeyboardInput) => {
    setToDoList([...toDoList,{id: id.current,
                task: KeyboardInput, 
                complete: false,
                visibility:"visible",
                display:"flex"} ]); 
    id.current++;
  
    //let copy = [...toDoList];
    //copy = [...copy, { id: toDoList.length + 1, task: KeyboardInput, complete: false }];
    //setToDoList(copy);
  }

  return (

    <div id="root" class="todo-app__root">
        <header class="todo-app__header">
        <h1 class="todo-app__title">todos</h1>
        </header>
       

            <section class="todo-app__main">
               
                <ul class="todo-app__list" id="todo-list">
                <AddTodos addTask={addTask} />
                <ToDoList toDoList={toDoList} 
                handleToggle={handleToggle} 
                handleFilter={handleFilter} 
                handleX={handleX} 
                
                />
                </ul>
            </section>
            <Footer toDoList={toDoList} 
            handleFilter={handleFilter} 
            
            handleAll={handleAll}
            handleActive={handleActive}
            handleCompleted={handleCompleted}
             />
            </div>
  );
}

export default App;
