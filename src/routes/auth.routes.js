import { register, login,refreshToken } from "../controllers/auth.controller.js";
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
                phone: { type: "string" },
                password: { type: "string" },
                "confirmPassword": { type: "string" },
              },
              required: ["name", "email","phone", "password", "confirmPassword"],
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
    app.post('/refresh-token', {
      schema:{
        description: "Refresh access token",
        tags: ["Auth"],
        body: {
          type: "object",
          properties: {
            refreshToken: { type: "string" },
          },
          required: ["refreshToken"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              accessToken: { type: "string" },
            },
          },
        },
      },
      handler: refreshToken,
    })
};

export default authRoutes;