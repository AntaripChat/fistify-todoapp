import { uploadProfile } from "../controllers/upload.controller.js";

const uploadProfileRoutes = (app) =>{
    app.post('/upload-profile', {
        schema: {
            description: "Upload user profile image",
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
        //     response: {
        //         200: {
        //             type: "object",
        //             properties: {
        //                 message: { type: "string" },
        //                 filename: { type: "string" },
        //             },
        //         },
        //         500:{
        //             type:"object",
        //             properties:{
        //                 message:{type:"string"},
        //                 error:{type:"string"},
        //             }
        //         }
        //     },
         },
        //preValidation:[app.authenticate],
        handler: uploadProfile,
    });
};

export default uploadProfileRoutes;