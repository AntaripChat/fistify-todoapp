import { register, login } from "../controllers/auth.controller.js";
import { registerValidationMiddleware, loginValidationMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = async (app) => {
    app.post('/register', {
        schema: {
            description: "Register a new user",
            tags: ["Auth"],
            body: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
              },
              required: ["name", "email", "password"],
            },
            response: {
              201: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  token: { type: "string" },
                },
              },
            },
          },
        preHandler: registerValidationMiddleware, 
        handler: register, 
    });

    app.post('/login', {
        schema: {
            description: "login  user",
            tags: ["Auth"],
            body: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
              required: [ "email", "password"],
            },
            response: {
              201: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  token: { type: "string" },
                },
              },
            },
          },
        preHandler: loginValidationMiddleware, 
        handler: login, 
    });
};

export default authRoutes;