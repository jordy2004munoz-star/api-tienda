import { conmyslq } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const result = await conmyslq.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al consultar clientes" });
  }
};

export const getclientesxid = async (req, res) => {
  try {
    const result = await conmyslq.query(
      'SELECT * FROM clientes WHERE cli_id = $1', [req.params.id]);
    if (result.rows.length === 0)
      return res.json({ cant: 0, message: "Cliente no encontrado" });
    res.json({ cant: result.rows.length, data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getclientesxcedula = async (req, res) => {
  try {
    const result = await conmyslq.query(
      'SELECT * FROM clientes WHERE cli_identificacion = $1', [req.params.cedula]);
    if (result.rows.length === 0) return res.status(404).json(null);
    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const postInsertarcliente = async (req, res) => {
  try {
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    const result = await conmyslq.query(
      'INSERT INTO clientes(cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING cli_id',
      [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad]
    );
    res.json({ cli_id: result.rows[0].cli_id });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const putcliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    await conmyslq.query(
      'UPDATE clientes SET cli_identificacion=$1, cli_nombre=$2, cli_telefono=$3, cli_correo=$4, cli_direccion=$5, cli_pais=$6, cli_ciudad=$7 WHERE cli_id=$8',
      [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
    );
    res.json({ message: "Cliente modificado" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const patchcliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body;
    await conmyslq.query(
      `UPDATE clientes SET 
        cli_identificacion = COALESCE($1, cli_identificacion),
        cli_nombre = COALESCE($2, cli_nombre),
        cli_telefono = COALESCE($3, cli_telefono),
        cli_correo = COALESCE($4, cli_correo),
        cli_direccion = COALESCE($5, cli_direccion),
        cli_pais = COALESCE($6, cli_pais),
        cli_ciudad = COALESCE($7, cli_ciudad)
       WHERE cli_id = $8`,
      [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad, id]
    );
    res.json({ message: "Cliente actualizado parcialmente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deletecliente = async (req, res) => {
  try {
    const result = await conmyslq.query(
      'DELETE FROM clientes WHERE cli_id = $1', [req.params.id]);
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};