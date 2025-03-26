import { getUserDetails } from "../controllers/user.controller.js";

const userRoute = (app) => {
    app.get("/profile", {
        schema: {
            description: "Get details of the authenticated user",
            tags: ["Profile"],
            response: {
                200: {
                    type: "object",
                    properties: {
                        user: {
                            type: "object",
                            properties: {
                                user: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        email: { type: "string" },
                                        phone: { type: "string" },
                                    },
                                },
                                token: { type: "string" }, 
                            },
                        },
                    },
                },
                401: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
        preValidation: [app.authenticate], 
        handler: getUserDetails,
    });
};

export default userRoute;


