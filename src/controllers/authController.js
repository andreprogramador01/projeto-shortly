import db  from '../config/database.js'
import bcrypt from 'bcrypt'

export async function cadastro(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    
    
    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
        const userExists = await db.query("SELECT * FROM usuarios WHERE email=$1",[email])

        if (userExists.rows[0]) {
            return res.status(409).send("Esse email já está cadastrado em nosso banco de dados")
        }
        const UserInserted = await db.query('INSERT INTO usuarios(name,email,password) VALUES($1,$2,$3)', [name, email, passwordHashed ])
        console.log(UserInserted)
        if (UserInserted.rowCount === 1) {
            return res.status(201).send("Usuário criado com sucesso")
        }
    } catch (error) {
        res.status(500).send("Ocorreu um erro no banco de dados")
    }


    res.sendStatus(201)
}