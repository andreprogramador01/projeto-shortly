import db  from '../config/database.js'
import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'

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
export async function login(req,res){
    const { email, password } = req.body

    const user = await db.query("SELECT * FROM usuarios WHERE email=$1",[ email ]) 

    if (user.rowCount === 1 && bcrypt.compareSync(password, user.rows[0].password)) {
        const token = uuidV4();
        try {
            await db.query('INSERT INTO sessoes(token,"userId") VALUES($1,$2)',[token, user.rows[0].id])
           
            return res.send(token)
        } catch (error) {
            console.error(error)
            return res.status(500).send('Ocorreu um erro no banco de dados')
        }


    } else {
        res.status(401).send('Email e/ou senha incorreto(s)')
    }

}