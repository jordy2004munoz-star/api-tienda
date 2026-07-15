import { Router } from 'express';
import { getProductos, getProducto, postProducto, putProducto, deleteProducto, upload } from '../controladores/productosCtrl.js';

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);

router.post('/productos', (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error multer:', err.message);
      return res.status(500).json({ error: err.message });
    }
    next();
  });
}, postProducto);

router.put('/productos/:id', (req, res, next) => {
  upload.single('imagen')(req, res, (err) => {
    if (err) {
      console.error('Error multer:', err.message);
      return res.status(500).json({ error: err.message });
    }
    next();
  });
}, putProducto);

router.delete('/productos/:id', deleteProducto);

export default router;