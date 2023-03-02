import { nanoid } from "nanoid"
import db from "../config/database.js"

export async function shortUrl(req, res) {
    const { url } = req.body
    const session = res.locals.sessao

    try {
        const userId = session.rows[0].userId
        const shortUrl = nanoid()
        const inserted = await db.query(`INSERT INTO urls 
                                        (url,"shortUrl","linksCount","userId") 
                                        VALUES($1,$2,$3,$4)`,
            [url, shortUrl, 0, userId])
        if (inserted.rowCount === 1) {
            const urlInserted = await db.query(`SELECT id,"shortUrl" FROM urls WHERE "shortUrl"=$1`, [shortUrl])
            console.log(urlInserted.rows[0])
            res.status(201).send(urlInserted.rows[0])
        }
    } catch (error) {
        console.error(error)
    }


}
export async function getUrlById(req, res) {
    const { id } = req.params
    try {
        const dataUrl = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id])


        if (dataUrl.rowCount === 1) {
            res.send(dataUrl.rows[0])
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        console.error(error)
    }


}

export async function redirectShortUrl(req, res) {
    const { shortUrl } = req.params
    try {
        const getUrl = await db.query(`SELECT url, "linksCount" FROM urls WHERE "shortUrl"=$1`, [shortUrl])
        if (getUrl.rowCount === 0) {
            return res.sendStatus(404)
        }
        const { linksCount, url } = getUrl.rows[0]

        const urlUpdated = await db.query(`UPDATE urls SET "linksCount"=$1 WHERE "shortUrl"=$2`, [linksCount + 1, shortUrl])

        res.redirect(url)
    } catch (error) {
        res.status(500).send(error)
    }

}
export async function deleteUrl(req, res) {
    const { id } = req.params
    const session = res.locals.sessao
    const { userId } = session.rows[0]
    try {
        const findUrlUser = await db.query(`SELECT * FROM urls WHERE id=$1 AND "userId"=$2`, [id,userId])
        const findUrl = await db.query(`SELECT * FROM urls WHERE id=$1 `, [id])
        if(findUrl.rowCount ===0){
            return res.sendStatus(404)
        }
        if(findUrlUser.rowCount ===0){
            return res.sendStatus(401)
        }
        const urlDeleted = await db.query('DELETE FROM urls WHERE id=$1', [id])
        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error)
    }
    
}