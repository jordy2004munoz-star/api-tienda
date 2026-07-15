import bcrypt from 'bcrypt';

const clave = '12345';

const hash = await bcrypt.hash(clave, 10);

console.log(hash);