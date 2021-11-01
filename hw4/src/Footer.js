import React from 'react';

const Footer = ({toDoList,handleFilter})=>{



    return(
        <footer class="todo-app__footer" id="todo-footer">
                <div class="todo-app__total">{toDoList.length} left</div>
                
                <ul class="todo-app__view-buttons">
                    <button >All</button>
                    <button >Active</button>
                    <button >Completed</button>
                </ul>
                <div class="todo-app__clean">
                    <button onClick={handleFilter}>Clear completed</button>
                </div>
            </footer>
    )
}
export default Footer;