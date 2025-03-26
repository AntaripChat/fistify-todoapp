import prisma from "../config/db.config.js";

export const registerValidationMiddleware = async (request, reply) => {
    const { name, email, phone, password, confirmPassword } = request.body;
    if (!name) {
      return reply.code(400).send({ message: 'Please Enter Name' });
    }
    if (!email) {
      return reply.code(400).send({ message: 'Please Enter Email' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return reply.code(400).send({ message: 'Email already exists' });
    }
    if (!phone) {    
      return reply.code(400).send({ message: 'Please Enter Phone' });
    }
    if (!password) {
      return reply.code(400).send({ message: 'Please Enter Password' });
    }
    if (!confirmPassword) {
      return reply.code(400).send({ message: 'Please Enter Confirm Password' });
    }
    if (password !== confirmPassword) {
      return reply.code(400).send({ message: 'Passwords do not match' });
    }
  
};
  
export const loginValidationMiddleware = async (request, reply) => {
    const { email, password } = request.body;
    if (!email) {
      return reply.code(400).send({ message: 'Please Enter Email' });
    }
    if (!password) {
      return reply.code(400).send({ message: 'Please Enter Password' });
    }
};