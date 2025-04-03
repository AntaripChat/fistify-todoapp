// const fs = require('fs');
// const path = require('path');
// const pump = require('pump'); 

import prisma from '../config/db.config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pump from 'pump';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadProfile = async (req, reply) => {
    try {
        const data = await req.file();
        
       
        const filename = path.basename(data.filename);
        if (!filename) {
            return reply.code(400).send({ message: 'Invalid filename' });
        }

        const uploadDir = path.join(__dirname, 'uploads');
        
        
        await fs.promises.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);

        await pump(data.file, fs.createWriteStream(filePath));

        await prisma.documentes.create({
            data: {
                filename: filename,
                //userId: req.user.userId, // Assuming you have userId in req.user
            }
        })
        reply.send({ 
            message: 'File uploaded successfully!', 
            filename: filename 
        });
    } catch(err) {
        return reply.code(500).send({
            message: "Failed to upload file",
            error: err.message
        });
    }
}