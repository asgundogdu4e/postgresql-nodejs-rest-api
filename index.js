/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./Db");
const portNumber = 3000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get("/", (request, response) => {
	response.json({
		Bilgi: "PostgreSQL, Node.js(Express) kullanarak RESTful API yapımı.",
		Info: "PostgreSQL, RESTful API construction using Node.js (Express)."
	});
});

app.get("/kullanicilar", db.KullanicilariGetir);
app.get("/kullanicilar/:OKytNo", db.KullaniciyiGetir);
app.post("/kullanicilar", db.KullaniciOlustur);
app.put("/kullanicilar/:OKytNo", db.KullaniciyiGuncelle);
app.delete("/kullanicilar/:OKytNo", db.KullaniciyiSil);

app.listen(portNumber, () => {
	console.log(`Uygulama çalışıyor. Port Numarası: ${portNumber}`);
});