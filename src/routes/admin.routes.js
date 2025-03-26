import { getAllUsers,getAllTodos } from "../controllers/admin.controller.js";

const adminRoutes = (app) => {
    app.get('/admin/users', {
        schema: {
            description: "Get all users",
            tags: ["Admin"],
        },
        preValidation: [app.authenticate],
        handler: getAllUsers,
    });
    app.get('/admin/todos', {
        schema: {
            description: "Get all users",
            tags: ["Admin"],
        },
        preValidation: [app.authenticate],
        handler: getAllTodos,
    });
};

export default adminRoutes;