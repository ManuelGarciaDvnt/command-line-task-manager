const fs = require("fs");
const path = require("path");

const saveTasks = (data) => {
  const parsedData = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve("db", "tasks.json"), parsedData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(path.resolve("db", "tasks.json"));
      }
    });
  });
};

const readTasks = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve("db", "tasks.json"), (err, data) => {
      if (err) {
        reject(err);
      } else {
        const tasks = JSON.parse(data);
        resolve(tasks);
      }
    });
  });
};

const updateTask = (title, newData) => {
  return new Promise((resolve, reject) => {
    readTasks().then((data) => {
      let taskToModify = data.filter((task) => task.titulo === title);
      let otherTasks = data.filter((task) => task.titulo !== title);
      taskToModify[0] = { ...taskToModify[0], ...newData };
      saveTasks([...taskToModify, ...otherTasks])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const deleteTask = (title) => {
  return new Promise((resolve, reject) => {
    readTasks().then((data) => {
      const newData = data.filter((task) => task.titulo !== title);
      saveTasks(newData)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

module.exports = { saveTasks, readTasks, updateTask, deleteTask };
