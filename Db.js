/*jshint esversion: 6 */
const PgPool = require('pg').Pool;
const pgPool = new PgPool({
    user: 'u_api',
    host: 'localhost',
    database: 'db_api',
    password: 'şifremmmm',
    port: 5432,
});

const KullanicilariGetir = (request, response) => {
    pgPool.query('SELECT * FROM Kullanicilar ORDER BY OKytNo ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const KullaniciyiGetir = (request, response) => {
    const OKytNo = parseInt(request.params.OKytNo);

    pgPool.query('SELECT * FROM Kullanicilar WHERE OKytNo = $1', [OKytNo], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const KullaniciOlustur = (request, response) => {
    const {
        Isim,
        Soyisim,
        Email
    } = request.body;

    pgPool.query('INSERT INTO Kullanicilar (Isim, Soyisim, Email) VALUES($1, $2, $3)', [Isim, Soyisim, Email])
        .then(res => {
            response.status(201).send(res);
        })
        .catch(e => console.error(e.stack));
};

const KullaniciyiGuncelle = (request, response) => {
    const OKytNo = parseInt(request.params.OKytNo);
    const {
        Isim,
        Soyisim,
        Email
    } = request.body;

    pgPool.query(
        'UPDATE Kullanicilar SET Isim = $1, Soyisim = $2, Email = $3 WHERE OKytNo = $4',
        [Isim, Soyisim, Email, OKytNo],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Kullunici güncellendi, OKytNo : ${OKytNo}`);
        }
    );
};

const KullaniciyiSil = (request, response) => {
    const OKytNo = parseInt(request.params.OKytNo);

    pgPool.query('DELETE FROM Kullanicilar WHERE OKytNo = $1', [OKytNo], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Kullanıcı kaydı silindi, OKytNo: ${OKytNo}`);
    });
};

module.exports = {
    KullanicilariGetir,
    KullaniciyiGetir,
    KullaniciOlustur,
    KullaniciyiGuncelle,
    KullaniciyiSil
};