import express from 'express';

const router = express.Router();

router.get('/productos', (req,res)=>{
    res.json({
        mensaje:"Productos funcionando"
    });
});

export default router;