import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoutes.js";
import { employeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";


const app=express();
app.use(cors({
	origin: ["http://127.0.0.1:5173"],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true
}))
app.use(express.json())
app.use(express.json({ urlencoded: true }))
app.use(express.static('Public'))
app.use(cookieParser())

app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)

const verifyUser=(req, res, next) => {
	const token=req.cookies.token;
	if (token) {
		Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
			if (err) return res.json({ Status: false, Error: "Invalid Token!" })
			req.id=decoded.id;
			req.role=decoded.role;
			next()
		})
	} else {
		return res.json({ Status: false, Error: "Not authenticated!" })
	}
}

app.get('/verify', verifyUser, (req, res) => {
	return res.json({ Status: true, role: req.role, id: req.id })
})


app.listen(3000, () => {
	console.log("Server is running")
})