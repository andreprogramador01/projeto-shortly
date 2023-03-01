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
            [url, shortUrl, 0,userId])
        if(inserted.rowCount===1){
            const urlInserted = await db.query(`SELECT id,"shortUrl" FROM urls WHERE "shortUrl"=$1`,[shortUrl])
            console.log(urlInserted.rows[0])
            res.status(201).send(urlInserted.rows[0])
        }
    } catch (error) {
        console.error(error)
    }


}
export async function getUrlById(req,res){
    const {id} = req.params
    const dataUrl = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id])


    res.send(dataUrl.rows[0])

}