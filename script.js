const inputBox = document.querySelector(".input input");
const addBtn = document.querySelector(".input button");
const todoList = document.querySelector(".list");
const deleteAllBtn = document.querySelector(".butn button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value;//getting user entered value
    if(userData.trim()!=0){
        //if user values aren't only space
        addBtn.classList.add("active");//active the add button 
    }else{
        addBtn.classList.remove("active");//active the add button
    } 
}
showTasks();//calling showtask functions

addBtn.onclick = ()=>{
    let userData = inputBox.value;//getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){
        // if localstorage is null
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming js string into a json object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showtask functionS
 }

 function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){
        // if localstorage is null
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming js string into a json object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//passing the length value in pendingNumb
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active");//active the clearall button
    }else{
        deleteAllBtn.classList.remove("active");//unactive the clearall button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
            newLiTag += `<li>${element}<span onclick =  "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
        });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = "";//once task added leave the input field blank

}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");   
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);//delete or remove the particular indexed li
    //after remove the li again update the local Storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
    showTasks();//calling showtask function
}  

//delete all tasks function
deleteAllBtn.onclick = ()=>{
     listArr = [];//empty an array
     //after delete all task again upadate the local storage
     localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into a json string
     showTasks();//calling showtask function
}