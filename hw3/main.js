//should be renewed by add/delete node
var numOfTodo = document.querySelectorAll("todo-app__item").length;
var numOfDone = document.querySelectorAll("input[type=checkbox]:checked").length;

checkFooter();
clearCompleted();

document.querySelector(".todo-app__input").addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        addTodoItem();
        numOfTodo=numOfTodo+1;
        document.querySelector(".todo-app__footer").classList.remove("visibility");
        }
        renewTotalLeft();
})

    document.querySelector("ul").addEventListener("mouseup", function(event){
        if(event.target.tagName=="LABEL"){
            if(event.target.parentNode.parentNode.classList.contains("switchCondition")){
                event.target.parentNode.parentNode.classList.remove("switchCondition");
                numOfDone=numOfDone-1;
            }
            else{
                event.target.parentNode.parentNode.classList.add("switchCondition");

                numOfDone=numOfDone+1;
            }
            renewTotalLeft();
            clearCompleted();
        }

        if(event.target.tagName=="IMG"){
            
            if(event.target.parentNode.childNodes[0].childNodes[0].checked == true){
                numOfDone=numOfDone-1;
            }
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
            numOfTodo=numOfTodo-1;
            checkFooter();
            renewTotalLeft();
            clearCompleted();
        }
    });

document.querySelector(".todo-app__clean").addEventListener("mouseup", function(event){

    while(numOfDone>0){
        document.querySelectorAll(".switchCondition")[0].remove();
        numOfDone=numOfDone-1;
        numOfTodo=numOfTodo-1;
    }
    clearCompleted();
    checkFooter();
});

document.querySelector(".todo-app__view-buttons").addEventListener("click", function(event){
    
    if(event.target.innerHTML==="Active"){
        for(var i=0; i<numOfTodo; i++){
            if(document.querySelectorAll("li")[i].classList.contains("switchCondition")){
                document.querySelectorAll("li")[i].style.display="none";
            }
            else{
                document.querySelectorAll("li")[i].style.display="flex";
            }
        }
    }
    else if(event.target.innerHTML==="Completed"){
        for(var i=0; i<numOfTodo; i++){
            if(document.querySelectorAll("li")[i].classList.contains("switchCondition")==false){
                document.querySelectorAll("li")[i].style.display="none";
            }
            else{
                document.querySelectorAll("li")[i].style.display="flex";
            }
        }
    }
    else if(event.target.innerHTML==="All"){
        for(var i=0; i<numOfTodo; i++){
        document.querySelectorAll("li")[i].style.display="flex";
    }
    }
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

function renewTotalLeft(){
    document.querySelector(".todo-app__total").innerHTML=numOfTodo-numOfDone+" left";
}

function checkFooter(){
    if (numOfTodo===0){
        document.querySelector(".todo-app__footer").classList.add("visibility");
    }
    else{
        document.querySelector(".todo-app__footer").classList.remove("visibility");
    }
}

function clearCompleted(){ 
    if(numOfDone===0){ 
        document.querySelector(".todo-app__clean").classList.add("visibility");
    }
    else{
        document.querySelector(".todo-app__clean").classList.remove("visibility");
    } 
}
