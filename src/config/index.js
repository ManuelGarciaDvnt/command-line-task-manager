const opts = {
  titulo: {
    demand: true,
    alias: "t",
    description: "El título de la tarea.",
  },
  descripcion: {
    default: " -- Sin descripción -- ",
    alias: "d",
    description: "La descripción de la tarea.",
  },
  completada: {
    default: false,
    alias: "e",
    description: "Estado de la tarea.",
  },
};

const { argv } = require("yargs")
  .command("crear", "Crea una tarea", opts)
  .command("listar", "Lista las tareas")
  .command("actualizar", "Actualiza una tarea", opts)
  .command("eliminar", "Elimina una tarea", opts)
  .help();

module.exports = { argv };
