//should be renewed by function delete node
var numOfTodo = document.querySelectorAll("todo-app__item").length;
if (numOfTodo===0){
    document.querySelector(".todo-app__footer").classList.add("visibility");
}
else{
    document.querySelector(".todo-app__footer").classList.remove("visibility");
}

document.querySelector(".todo-app__input").addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        addTodoItem();
        numOfTodo=numOfTodo+1;
        document.querySelector(".todo-app__footer").classList.remove("visibility");
        }
})

    document.querySelector("ul").addEventListener("mouseup", function(event){
        event.target.parentNode.parentNode.classList.toggle("switchCondition");
    });


function addTodoItem(){

    newdiv = document.createElement("div"); 
    newdiv.classList.add("todo-app__checkbox");

    newinput = document.createElement("input");
    newinput.type = "checkbox";
    newinput.id = numOfTodo.toString(); //starting index from 0

    newlabel = document.createElement("label");
    newlabel.setAttribute("for",numOfTodo.toString());

    newdiv.append(newinput,newlabel);
    

    var todoItem = document.querySelector(".todo-app__input").value;
    newh1 = document.createElement("h1");
    newh1.innerHTML = todoItem; //.textContent
    newh1.classList.add("todo-app__item-detail");


    newimg = document.createElement("img");
    newimg.src = "./img/x.png";
    newimg.classList.add("todo-app__item-x");


    newTodoItem = document.createElement("li");
    newTodoItem.classList.add("todo-app__item");
    newTodoItem.append(newdiv,newh1,newimg);

    document.querySelector(".todo-app__list").appendChild(newTodoItem);
    
    document.querySelector(".todo-app__input").value="";
}