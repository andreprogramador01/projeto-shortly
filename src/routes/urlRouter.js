import { Router } from "express"
import { authValidation } from "../middlewares/authValidationMiddleware.js"
import { shortUrl } from "../controllers/urlController.js"
import schemaValidation from "../middlewares/schemaValidationMiddleware.js"
import urlSchema from "../schemas/urlSchema.js"

const urlRouter = Router()

urlRouter.post('/urls/shorten', authValidation,schemaValidation(urlSchema), shortUrl)

export default urlRouter