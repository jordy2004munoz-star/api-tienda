import { Router } from "express";
//import {verificarToken} from '../'
import {getClientes, getclientesxid, getclientesxcedula, postInsertarcliente, putcliente, patchcliente, deletecliente} from '../controladores/clientesCtrl.js'
import { verificarToken } from '../middlewares/auth.js';

const router =Router()
//armar nuestra rutas

router.get('/clientes', verificarToken, getClientes);
router.post('/clientes', verificarToken, postInsertarcliente);
router.put('/clientes/:id', verificarToken, putcliente);
router.delete('/clientes/:id', verificarToken, deletecliente);
router.get('/clientes/cedula/:cedula', verificarToken, getclientesxcedula);

export default router