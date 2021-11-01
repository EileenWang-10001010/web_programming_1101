import React , {useState} from 'react';

// Key in your todo tasks
const AddTodos =({addTask}) => {
    //useState
    const [KeyboardInput, setKeyboardInput] = useState("");
  
    const handleChange = (e) => {
        setKeyboardInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      
        e.preventDefault();
        addTask(KeyboardInput);
        setKeyboardInput("");
      
    };

    return(
        <form onSubmit={handleSubmit}>
        <input class="todo-app__input" 
               type="text" 
               value={KeyboardInput}
               onChange={handleChange} 
               placeholder="What's need to be done?" />
               </form>
        )
    };

    export default AddTodos;