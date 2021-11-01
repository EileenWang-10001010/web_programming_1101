import React ,{useState} from 'react';
import ToDo from './ToDo';

   const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    const [visible, setvisible ] = useState(true);

    const handleVisibility=({handleVisibles})=>{
        alert({handleVisibles});

        switch ({handleVisibles}){
            case "All":
                setvisible(true);
                break;
            case "Active":
                toDoList.complete? setvisible(false):setvisible(true);
                break;
            case "Completed":
                toDoList.complete? setvisible(true):setvisible(false);
                break;
        }
    }


    return (
        <div>
            {toDoList.map(todo => {
                return (
       <ToDo todo={todo} 
       handleToggle={handleToggle} 
       handleFilter={handleFilter} 
       
       />
       )
            })}
        
        </div>
    );
};

export default ToDoList;