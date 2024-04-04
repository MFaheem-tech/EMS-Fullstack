import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoutes.js";


const app=express();
app.use(cors({
	origin: ["http://127.0.0.1:5173"],
	methods: ['GET', 'POST', 'PUT'],
	credentials: true
}))
app.use(express.json())
app.use(express.json({ urlencoded: true }))
app.use(express.static('Public'))

app.use('/auth', adminRouter)


app.listen(3000, () => {
	console.log("Server is running")
})