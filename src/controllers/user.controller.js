// import { createUser, findUserByEmail, findUserById } from '../models/userModel.js';
import { generateToken, generateRefreshToken } from '../utils/jwtUtils.js';
import { redis } from '../utils/redisClint.js';
import prisma from '../config/db.config.js';

export const getUserDetails = async (req, reply) => {
  try {
    const userId = req.user.userId; 
    const cachedUser = await redis.get(`user:${userId}`);
    if (cachedUser) {
      return reply.send({ user: JSON.parse(cachedUser) });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    await redis.set(`user:${userId}`, JSON.stringify(user));
    reply.send({ user });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: 'Server error' });
  }
};


export const refreshToken = async (req, reply) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = generateToken({ id: decoded.id });
    reply.send({ accessToken: newAccessToken });
  } catch (error) {
    reply.code(401).send({ error: 'Invalid refresh token' });
  }
};



export const updateUser = async (req, reply) => {
  try {
    const userId = req.user.id; // Get user ID from JWT token
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      return reply.code(400).send({ error: 'At least one field is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, phone },
    }); 
    await redis.set(`user:${userId}`, JSON.stringify(updatedUser));

    reply.send({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update error:', error);
    reply.code(500).send({ error: 'Failed to update user' });
  }
};

