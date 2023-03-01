import  express  from "express";
import cors from "cors";
import authRouter from './routes/authRouter.js'
import urlRouter from "./routes/urlRouter.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use([authRouter,urlRouter])


app.listen(process.env.PORT)