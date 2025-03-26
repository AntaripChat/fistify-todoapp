import app from  '../app.js';

export const generateToken = (user) =>{
    return app.jwt.sign({userId:user.id,isAdmin: user.isAdmin}, {expiresIn: '1h'});
}

export const generateRefreshToken = (user) => {
    return app.jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  };