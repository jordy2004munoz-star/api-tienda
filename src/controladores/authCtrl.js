import jwt from 'jsonwebtoken';

export const login = async (req, res) => {

    const { usuario, password } = req.body;

    // Aquí normalmente consultas la BD
    if (usuario === "admin" && password === "12345") {

        const token = jwt.sign(
            {
                usuario: usuario
            },
            "clave_secreta",
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            token
        });
    }

    res.status(401).json({
        message: "Credenciales incorrectas"
    });
}