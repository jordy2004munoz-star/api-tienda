import express, { request } from 'express'
//npm install cors
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js'
import authRoutes from './routes/auth.routes.js';




const app= express();

const corsOptions={
    origin:'http://localhost:8101',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}

app.use(cors(corsOptions));//habilitar los cors
app.use(express.json());//para que interprete los objetos .json
app.use('/api', authRoutes);
//rutas 
app.use('/api', clientesRoutes)
app.use((req,res,next)=>{
    res.status(400).json({
        message: 'Endpoint not found'
    })
})
export default app;