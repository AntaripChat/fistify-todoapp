import app from  './app.js';
import serverCongif from './config/server.config.js';
import authRoutes from './routes/auth.routes.js';
import todoRoute from './routes/todo.routes.js';
import userRoute from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import jwt from 'fastify-jwt';
import { setupSwagger } from './config/swagger.js';

app.register(jwt,{secret:process.env.JWT_SECRET});

setupSwagger(app);

app.register(authRoutes,{prefix:'/api'});
app.register(userRoute,{prefix:'/api'});
app.register(todoRoute,{prefix:'/api'});
app.register(adminRoutes,{prefix:'/api'});

app.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify();
      console.log('Decoded User:', req.user);
    } catch (err) {
      console.error('Token verification failed:', err.message);
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });
  
(async function (){
    try{
        await app.listen({port:serverCongif.PORT});
        app.log.info(`Server listening on port ${serverCongif.PORT}`);
    }catch(err){
        app.log.error(err);
        process.exit(1);
    };
})()



