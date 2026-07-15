import { pool } from '../db.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'apptienda',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'image'
    };
  }
});

export const upload = multer({ storage });

export const getProductos = async (req, res) => {
  const result = await pool.query('SELECT * FROM _productos ORDER BY prod_id');
  res.json(result.rows);
};

export const getProducto = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM _productos WHERE prod_id = $1', [id]);
  res.json(result.rows[0]);
};

export const postProducto = async (req, res) => {
  try {
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo } = req.body;
    const prod_imagen = req.file ? req.file.path : '';
    const result = await pool.query(
      'INSERT INTO _productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('ERROR postProducto:', error.message);  // ← esto muestra el error real
    res.status(500).json({ error: error.message });
  }
};

export const putProducto = async (req, res) => {
  const { id } = req.params;
  const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;
  const imagen = req.file ? req.file.path : prod_imagen;
  const result = await pool.query(
    'UPDATE _productos SET prod_codigo=$1, prod_nombre=$2, prod_stock=$3, prod_precio=$4, prod_activo=$5, prod_imagen=$6 WHERE prod_id=$7 RETURNING *',
    [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, imagen, id]
  );
  res.json(result.rows[0]);
};

export const deleteProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    await pool.query('DELETE FROM _productos WHERE prod_id = $1', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('ERROR deleteProducto:', error.message);
    res.status(500).json({ error: error.message });
  }
};