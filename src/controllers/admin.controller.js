import prisma from "../config/db.config.js";
//import { redis } from "../utils/redisClint";

export const getAllUsers = async (req, reply) => {
    try {
        if (!req.user.isAdmin) {
            return reply.status(401).send("Access denied");
        }
        console.log(req.user.isAdmin);
        const allUser = await prisma.user.findMany(); 
        return reply.send(allUser);
    } catch (err) {
        return reply.status(500).send("Server error"); 
    }
};

export const getAllTodos = async (req, reply) => {
    try{
        if(!req.user.isAdmin){
            return reply.status(401).send("Access denied");
        }
        const allTodos = await prisma.todo.findMany();
        return reply.send(allTodos);
    }catch(err){
        return reply.status(500).send("Server error");
    }
};

