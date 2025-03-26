import { createTodo, getTodos } from "../controllers/todo.controller.js";

const todoRoute = (app) => {
  app.post("/todos", {
    schema: {
        description: "Create a new todo",
        tags: ["Todo"],
        body: {
            type: "object",
            properties: {
            title: { type: "string" },
            },
            required: ["title"],
        },
    },
    preValidation: [app.authenticate],
    handler: createTodo,
  });

  app.get('/todos',{
    schema: {
      description: "Get all todos",
      tags: ["Todo"],
    },
    preValidation: [app.authenticate],
    handler: getTodos,
  })
  // app.post('/todos',{ preValidation:[app.authenticate]},createTodo);
  // app.get('/todos',{ preValidation:[app.authenticate]},getTodos);
};

export default todoRoute;
