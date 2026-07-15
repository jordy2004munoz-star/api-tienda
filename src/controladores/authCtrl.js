import jwt from 'jsonwebtoken';
import { conmyslq } from '../db.js';

export const login = async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const resultado = await conmyslq.query(
            'SELECT * FROM _usuarios WHERE usr_usuario = $1',
            [usuario]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                message: 'Usuario no existe'
            });
        }

        const user = resultado.rows[0];

        if (user.usr_clave !== password) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: user.usr_id,
                usuario: user.usr_usuario,
                nombre: user.usr_nombre
            },
            'clave_secreta',
            {
                expiresIn: '1h'
            }
        );

        res.json({
            token,
            usuario: user.usr_nombre
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error del servidor'
        });

    }

};