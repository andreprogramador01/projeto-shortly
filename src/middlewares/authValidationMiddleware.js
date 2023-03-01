import db from '../config/database.js'

export async function authValidation(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    if (!token) {
        return res.sendStatus(401)
    }
    try {
        const session = await db.query('SELECT * FROM sessoes WHERE token=$1', [token])
        if (session.rowCount === 0) {
            return res.sendStatus(401)
        }
        res.locals.sessao = session
    } catch (err) {
        console.log(err)
        res.status(500).send('Ocorreu um erro no servidor')
    }

    next()
}
