import mysql from 'mysql';

const conn=mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "ems"
})

conn.connect(function (err) {
	if (err) {
		console.log("Database connection error")
	} else {
		console.log('Database connected')
	}
})

export default conn;