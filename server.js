const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const www = process.env.WWW || './dist'
app.use(express.static(www))
console.log(`serving ${www}`)
app.get('*', (req, res) => {
	res.sendFile(`index.html`, { root: www })
})
app.post('*', (req, res) => {
	res.sendFile(`index.html`, { root: www })
})
app.listen(port, () => console.log(`listening on http://localhost:${port}`))

// const https = require('https')
// const fs = require('fs')
// const express = require('express')
// const app = express()

// const port = process.env.PORT || 3000
// const www = process.env.WWW || './dist'

// app.use(express.static(www))
// console.log(`serving ${www}`)

// // res.sendFile(__dirname + '/public/index.html');

// app.get('*', (req, res) => {
// 	// res.sendFile(`${www}/index.html`)
// 	res.sendFile(__dirname + '/public/index.html')
// })

// app.post('*', (req, res) => {
// 	// res.sendFile(`${www}/index.html`)
// 	res.sendFile(__dirname + '/public/index.html')
// })

// const options = {
// 	key: fs.readFileSync('/mnt/data/certs/privatekey.pem'),
// 	cert: fs.readFileSync('/mnt/data/certs/certificate.pem'),
// }

// https.createServer(options, app).listen(port, () => {
// 	console.log(`Server is running on https://localhost:${port}`)
// })
