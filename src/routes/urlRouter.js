import { Router } from "express"
import { authValidation } from "../middlewares/authValidationMiddleware.js"
import { shortUrl, getUrlById, redirectShortUrl,deleteUrl } from "../controllers/urlController.js"
import schemaValidation from "../middlewares/schemaValidationMiddleware.js"
import urlSchema from "../schemas/urlSchema.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', authValidation, schemaValidation(urlSchema), shortUrl)
urlRouter.get('/urls/:id', getUrlById)
urlRouter.get('/urls/open/:shortUrl', redirectShortUrl)
urlRouter.delete('/urls/:id',authValidation, deleteUrl)

export default urlRouter