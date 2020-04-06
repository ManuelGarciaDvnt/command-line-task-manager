const colors = require("colors/safe");
const { argv } = require("./config");
const tasksActions = require("./utils/task-functions");

let tasks = [];

const { titulo, descripcion, completada } = argv;
switch (argv._[0]) {
  case "crear": {
    tasksActions.readTasks().then((data) => {
      tasks = [
        ...data,
        {
          titulo,
          descripcion,
          completada,
        },
      ];
      tasksActions
        .saveTasks(tasks)
        .then((res) => {
          console.log("Tareas guardadas: ", colors.green(res));
        })
        .catch((err) => {
          console.log("Ocurrió un error: ", colors.red(err));
        });
    });
    break;
  }
  case "listar": {
    tasksActions.readTasks().then((data) => {
      console.log("======== Tareas por hacer ========\n");
      data.forEach((task) => {
        console.log("________________________________________\n");
        console.log(`* Título: ${colors.green(task.titulo)}`);
        console.log(`* Descripción: ${task.descripcion}`);
        console.log(`* Completada: ${task.completada}\n`);
        console.log("________________________________________");
      });
    });
    break;
  }
  case "actualizar": {
    tasksActions
      .updateTask(argv.titulo, {
        titulo: argv.titulo,
        descripcion: argv.descripcion,
        completada: argv.completada,
      })
      .then((res) => {
        console.log("Tarea actualizada con éxito: ", colors.green(res));
      })
      .catch((err) => {
        console.log("Ocurrió un error: ", colors.red(err));
      });
    break;
  }
  case "eliminar": {
    tasksActions
      .deleteTask(argv.titulo)
      .then((res) => {
        console.log("Tarea eliminada con éxito", colors.green(res));
      })
      .catch((err) => {
        console.log("Ocurrió un error: ", colors.bold(colors.red(err)));
      });
    break;
  }
  default: {
    console.log(colors.yellow(colors.bold("Comando no reconocido")));
  }
}
