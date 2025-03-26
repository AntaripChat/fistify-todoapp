import prisma from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";
import { redis } from "../utils/redisClint.js";

export const register = async(req,reply) =>{
    try{
        const {name,email,phone,password,confirmPassword,isAdmin} = req.body;

        const hashedPassword = await bcrypt.hash(password,12);
        
        const data = {
            name,
            email,
            phone,
            password:hashedPassword,
            isAdmin:isAdmin || false,
        }
        const user = await prisma.user.create({data});
        await redis.set(`user:${user.id}`, JSON.stringify(user));
        return reply.send(`${user.name} is registered successfully`);
    }catch(err){
        reply.send(err);
    }
}

export const login = async(req,reply) =>{
    try{
        const {email,password} = req.body;
        const user = await prisma.user.findUnique({where:{email}});
        if(!user){
            return reply.status(400).send("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return reply.status(400).send("Invalid credentials");
        }
        const token = generateToken(user);
        
        await redis.set(`user:${user.id}`,JSON.stringify({user: {name: user.name,email: user.email,phone: user.phone,},token: token,}));

        return reply.send({token,user: {name: user.name,email: user.email,phone: user.phone,}});
    }catch(err){
        reply.send(err);
    }
}