import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/clientes.routes.js';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:8100',
        'http://localhost:8101'
    ],
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);


app.use((req,res)=>{
    res.status(400).json({
        message:'Endpoint not found'
    });
});

export default app;