// swagger.js
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export function setupSwagger(app) {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "TODO API",
        description: "API documentation for Fastify Prisma CRUD",
        version: "1.0.0",
      },
      servers: [
        { url: "http://localhost:4000", description: "Local server" },
      ],
      tags: [
        { name: "Auth", description: "Authentication related endpoints" },
        { name: "Profile", description: "User related endpoints" },
        { name: "Todo", description: "Todo related endpoints" },
        { name: "Admin", description: "Admin related endpoints" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT", // Optional: indicates JWT token
            description: "Enter your Bearer token in the format: 'Bearer <token>'",
          },
        },
      },
      // Optional: Apply Bearer auth globally to all routes
      security: [{ bearerAuth: [] }],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      persistAuthorization: true, // Persists the token across page refreshes
      docExpansion: "list", // Expands all endpoints by default
    },
    staticCSP: true, // Adds Content Security Policy for security
  });
}