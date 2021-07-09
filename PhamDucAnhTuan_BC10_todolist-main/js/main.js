import Task from "./Task.js";
import Services from "./Service.js";

const listTask = new Services();

const getEle = (id) => {
  return document.getElementById(id);
};



const fetchData = () => {
  listTask
    .getListTask()
    .then((result) => {
      let todo = [];
      let completed = [];

      result.data.forEach((status) => {
        if (status.checked === false) {
          todo.push(status);
        } else {
          completed.push(status);
        }
      });

      getEle("todo").innerHTML = renderList(todo);
      getEle("completed").innerHTML = renderList(completed);
      getEle("newTask").value = "";
    })
    .catch((error) => {
      console.log(error);
    });
};
fetchData();


const renderList = (arr) => {
  return arr.reduce((contentHTML, item) => {
    return (contentHTML += `
      <li>
      <span class="checkItem">
        <span class="fa fa-check-circle" onclick="checkItem(${item.id})" title="Check Task"></span>
        <span class="loading" id="loading(${item.id})">
          <span class="loader" id="loader">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </span>
      </span>
      
      <span class="textTask">${item.text}</span>
      <span class="editItem">
        <span onclick="editItem(${item.id})" class="update-btn" title="Edit Task"></span>
        <span onclick="delItem(${item.id})" class="delete-btn" title="Delete Task"></span>
      </span>
      </li>
      `);
  }, "");
};

const addItem = () => {
  let text = getEle("newTask").value;

  const task = new Task("", text, false);

  if (text.trim() !== "") {
    listTask
      .addTask(task)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Enter an activity...");
  }
};
window.addItem = addItem;


const delItem = (id) => {
  getEle(`loading(${id})`).style.display = "block";

  listTask
    .deleteTask(id)
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.delItem = delItem;


const editItem = (id) => {
  listTask
    .getTaskById(id)
    .then((result) => {
      getEle("newTask").value = result.data.text;
      document.getElementsByClassName("card__add")[0].classList.add("change");

      getEle("addItem").innerHTML = `
      <i class="fas fa-sync-alt" onclick="updateItem(${id})" title="UpdateTask"></i>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
};
window.editItem = editItem;

const checkItem = (id, text) => {
  getEle(`loading(${id})`).style.display = "block";

  listTask
    .getTaskById(id)
    .then((result) => {
      let isChecked = false;
      if (isChecked === result.data.checked) {
        isChecked = true;
      }
      const task = new Task(id, text, isChecked);
      listTask
        .updateTask(task)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
window.checkItem = checkItem;

const updateItem = (id, checked) => {
  let text = getEle("newTask").value;

  const task = new Task(id, text, checked);

  if (text.trim() !== "") {
    listTask
      .updateTask(task)
      .then(() => {
        fetchData();
        document
          .getElementsByClassName("card__add")[0]
          .classList.remove("change");

        getEle(
          "addItem"
        ).innerHTML = `<i class="fas fa-plus" onclick="addItem()"></i>`;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Enter an activity...");
  }
};
window.updateItem = updateItem;





getEle("two").addEventListener("click", () => {
  const listTodo = document.getElementById("todo");
  const taskTodo = listTodo.getElementsByTagName("li");
  const todo = [];
  for (let i = 0; i < taskTodo.length; i++) {
    todo.push(taskTodo[i].getElementsByClassName("textTask")[0].innerHTML);
  }
  todo.sort((a, b) => a.localeCompare(b));
  for (let i = 0; i < taskTodo.length; i++) {
    taskTodo[i].getElementsByClassName("textTask")[0].innerHTML = todo[i];
  }

  const listCompleted = document.getElementById("completed");
  const taskCompleted = listCompleted.getElementsByTagName("li");
  const completed = [];
  for (var i = 0; i < taskCompleted.length; i++) {
    completed.push(
      taskCompleted[i].getElementsByClassName("textTask")[0].innerHTML
    );
  }
  completed.sort((a, b) => a.localeCompare(b));
  for (let i = 0; i < taskCompleted.length; i++) {
    taskCompleted[i].getElementsByClassName("textTask")[0].innerHTML =
      completed[i];
  }
});


getEle("three").addEventListener("click", () => {
  const listTodo = document.getElementById("todo");
  const taskTodo = listTodo.getElementsByTagName("li");
  const todo = [];
  for (let i = 0; i < taskTodo.length; i++) {
    todo.push(taskTodo[i].getElementsByClassName("textTask")[0].innerHTML);
  }
  todo.sort((a, b) => b.localeCompare(a));
  for (let i = 0; i < taskTodo.length; i++) {
    taskTodo[i].getElementsByClassName("textTask")[0].innerHTML = todo[i];
  }

  const listCompleted = document.getElementById("completed");
  const taskCompleted = listCompleted.getElementsByTagName("li");
  const completed = [];
  for (var i = 0; i < taskCompleted.length; i++) {
    completed.push(
      taskCompleted[i].getElementsByClassName("textTask")[0].innerHTML
    );
  }
  completed.sort((a, b) => b.localeCompare(a));
  for (let i = 0; i < taskCompleted.length; i++) {
    taskCompleted[i].getElementsByClassName("textTask")[0].innerHTML =
      completed[i];
  }
});
