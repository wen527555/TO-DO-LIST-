let scetion = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  //prevent form being submitted
  e.preventDefault();
  //get the input values

  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") {
    alert(" Please Enter some Text");
    return;
  }
  //create a todo item
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  //create green ckeck rec trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  });

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;

    todoItem.addEventListener("animationend", () => {
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });

      todoItem.remove();
    });
    todoItem.style.animation = "scaleDown 0.3s forwards";
  });

  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  let mylist = localStorage.getItem("list");
  if (mylist == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(mylist);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }
  console.log(JSON.parse(localStorage.getItem("list")));

  form.children[0].value = ""; //clear
  form.children[1].value = "";
  form.children[2].value = "";

  scetion.appendChild(todo);
});

let mylist = localStorage.getItem("list");
if (mylist !== null) {
  let myListArray = JSON.parse(mylist);
  myListArray.forEach((item) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = item.todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = item.todoMonth + "/" + item.todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    completeButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done");
    });

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    trashButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;

      todoItem.addEventListener("animationend", () => {
        //remove
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        todoItem.remove();
      });
      todoItem.style.animation = "scaleDown 0.3s forwards";
    });
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    scetion.appendChild(todo);
  });
}
