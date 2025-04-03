import { getUserDetails,updateUser } from "../controllers/user.controller.js";

const userRoute = (app) => {
    app.get("/profile", {
        schema: {
            description: "Get details of the authenticated user",
            tags: ["Profile"],
            // response: {
            //     200: {
            //         type: "object",
            //         properties: {
            //             user: {
            //                 type: "object",
            //                 properties: {
            //                     user: {
            //                         type: "object",
            //                         properties: {
            //                             name: { type: "string" },
            //                             email: { type: "string" },
            //                             phone: { type: "string" },
            //                         },
            //                     },
            //                     token: { type: "string" }, 
            //                 },
            //             },
            //         },
            //     },
            //     401: {
            //         type: "object",
            //         properties: {
            //             message: { type: "string" },
            //         },
            //     },
            // },
        },
        preValidation: [app.authenticate], 
        handler: getUserDetails,
    });
    app.post('/update-profile', {
        schema: {
            description: "Update user profile",
            tags: ["Profile"],
            // body: {
            //     type: "object",
            //     properties: {
            //         name: { type: "string" },
            //         email: { type: "string" },
            //         phone: { type: "string" },
            //     },
            //     required: ["name", "email", "phone"],
            // },
            // response: {
            //     200: {
            //         type: "object",
            //         properties: {
            //             message: { type: "string" },
            //             user: {
            //                 type: "object",
            //                 properties: {
            //                     name: { type: "string" },
            //                     email: { type: "string" },
            //                     phone: { type: "string" },
            //                 },
            //             },
            //         },
            //     },
            // },
        },
        preValidation:[app.authenticate],
        handler:updateUser,
    });
};

export default userRoute;


