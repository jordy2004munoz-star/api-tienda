import { conmyslq } from "../db.js"
export const getClientes=
    async (req,res)=>{
        try {
            const [result]= await conmyslq.query('select * from clientes')
            res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar clientes"})
    }
    }


export const getclientesxid= async(req,res)=>{
    try {
        const [result]= await conmyslq.query(
            'select * from clientes where cli_id=?',[req.params.id]);
            if(result.length<=0)return res.json(
                {
                cant:0,
                message:"Cliente no encontrado"
            }
        )
            res.json({cant:result.length,data:result[0]});
    } catch (error) {
        return res.status(500).json({message:"Error en el servidor"});
    }
}

export const postInsertarcliente= async(req,res)=>{
    try {
         const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad}=req.body
         //console.log(req.body)
         const [result]= await conmyslq.query(
            'insert into clientes(cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad) values (?,?,?,?,?,?,?)',
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad]
         )
         res.send({cli_id:result.insertId})

    } catch (error) {
        return res.status(500).json({message:"Error en el servidor"});
    }
}

export const putcliente= async(req,res)=>{
    try {
         const {id}=req.params
         console.log(id)
         const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad}=req.body
         console.log(req.body)
         const [result]= await conmyslq.query(
            'update clientes set cli_identificacion=?,cli_nombre=?,cli_telefono=?,cli_correo=?,cli_direccion=?,cli_pais=?,cli_ciudad=? where cli_id=? ',
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad,id]
         )
         res.send({message: "cliente modificado"})

    } catch (error) {
        return res.status(500).json({message:"Error en el servidor"});
    }
}

export const patchcliente = async (req, res) => {
    try {
        const { id } = req.params;
        const {cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad} = req.body;
        const [result] = await conmyslq.query(
             `update clientes set cli_identificacion = IFNULL(?, cli_identificacion),cli_nombre = IFNULL(?, cli_nombre),cli_telefono = IFNULL(?, cli_telefono),
             cli_correo = IFNULL(?, cli_correo),cli_direccion = IFNULL(?, cli_direccion),cli_pais = IFNULL(?, cli_pais),cli_ciudad = IFNULL(?, cli_ciudad)WHERE cli_id = ?`,
            [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad,id]
        );
        res.json({
            message: "Cliente actualizado parcialmente"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error en el servidor"});
    }
};

export const deletecliente = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conmyslq.query(
            'DELETE FROM clientes WHERE cli_id = ?',
            [id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        res.json({
            message: "Cliente eliminado"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error en el servidor"
        });
    }
};

export const getclientesxcedula = async (req, res) => {
  const { cedula } = req.params;
  const result = await pool.query(
    'SELECT * FROM clientes WHERE cli_identificacion = $1', [cedula]
  );
  if (result.rows.length === 0) return res.status(404).json(null);
  res.json(result.rows[0]);
};