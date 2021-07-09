export default class Services {
  addTask(task) {
    return axios({
      url: "https://60bc9acdb8ab37001759f4c9.mockapi.io/api/todolist",
      method: "POST",
      data: task,
    });
  }

  getListTask() {
    return axios({
      url: "https://60bc9acdb8ab37001759f4c9.mockapi.io/api/todolist",
      method: "GET",
    });
  }

  deleteTask(id) {
    return axios({
      url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/todolist/${id}`,
      method: "DELETE",
    });
  }

  getTaskById(id) {
    return axios({
      url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/todolist/${id}`,
      method: "GET",
    });
  }

  updateTask(task) {
    return axios({
      url: `https://60bc9acdb8ab37001759f4c9.mockapi.io/api/todolist/${task.id}`,
      method: "PUT",
      data: task,
    });
  }
}
