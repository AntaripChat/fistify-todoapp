import prisma from "../config/db.config.js";
import { redis } from "../utils/redisClint.js";
export const createTodo = async (req, reply) => {
    try {
        const { title } = req.body;
        if (!title) {
            return reply.code(400).send({ message: "Please Enter Title" });
        }
        
        const userId = req.user.userId;
        const todo = await prisma.todo.create({
            data: {
                title,
                userId, 
            }
        });
        await redis.del(`todos:${userId}`,JSON.stringify(todo));
        return reply.code(201).send({
            message: "Todo created successfully!",
            todo
        });
        
    } catch (err) {
        console.error("Error creating todo:", err);
        return reply.code(500).send({
            message: "Failed to create todo",
            error: err.message
        });
    }
}


export const getTodos = async (req, reply) => {
    try {
        const userId = req.user.userId;
        const cachedTodos = await redis.get(`todos:${userId}`);
        if (cachedTodos) {
            return reply.send({ todos: JSON.parse(cachedTodos) });
        }
        const todos = await prisma.todo.findMany({
            where: {
                userId
            }
        });
        await redis.set(`todos:${userId}`, JSON.stringify(todos));
        return reply.send({ todos });
    } catch (err) {
        console.error("Error fetching todos:", err);
        return reply.code(500).send({
            message: "Failed to fetch todos",
            error: err.message
        });
    }
}