var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clan15'
});



exports.index = function (req, res) {
    res.render('index', { title: 'Clan 15', message: '' });
};


exports.indexPost = function (req, res) {
    var jmbg = req.body.unosJMBG; //hvatamo sa unos jmbg unet jmbg broj
    if (!jmbg) { //ako nema unetog jmbg broja izbacujemo poruku
        res.render('index', { title: 'Clan 15', message: 'Morate uneti JMBG!' });

    } else {//ako je unet jmbg, proveravamo da li postoji u bazi
        
      var podaci=  connection.query('SELECT * FROM korisnik WHERE jmbg = ?', jmbg, function (error, rows) {
            if (error) throw error
            for (i = 0; i < rows.length; i++)
                var row = rows[i];
            console.log(row);
            
            if (!row) {//ako ne postoji taj jmbg u bazi, izbacujem poruku
                res.render('index', { title: 'Clan 15', message: 'Ne postoji JMBG!' });
            } else//ako postoji jmbg u bazi, idemo na stranu za unos korisnika i prosledjujemo podatke vezane za taj jmbg
                res.render('unos', { title: 'Azuriranje podataka', podaci:rows });
        });
    }
};//kraj exports.indexPost




exports.unos = function (req, res) {

    res.render('unos', { title: 'Azuriranje korisnika' });
};
exports.unosPost = function (req, res) {
    console.log(req.body);
    
    var data = [];
    var query = "INSERT INTO korisnik (jmbg, imePrezime, adresa, postanskiBroj, mesto) VALUES ('" + req.body.jmbg + "','" + req.body.ime + "', '" + req.body.adresa + "', '" + req.body.posta + "', '" + req.body.grad + "')";
    connection.query(query, data);
    console.log(data);
    res.redirect('finansijskakartica');
};






exports.unosNovog = function (req, res) {
    res.render('unosNovog', { title: 'Unos novog korisnika' });
};

exports.unosNovogPost = function (req, res) {
    console.log(req.body);
    var jmbg = req.body.unosJMBG;
    connection.query('SELECT * FROM korisnik WHERE jmbg = ?', jmbg, function (error, rows) {
        if (!jmbg) {
            var data = [];
            var query = "INSERT INTO korisnik (jmbg, imePrezime, adresa, postanskiBroj, mesto) VALUES('" + req.body.jmbg + "', '" + req.body.ime + "', '" + req.body.adresa + "', '" + req.body.posta + "', '" + req.body.grad + "') ";
            connection.query(query, data);
            console.log(data);
            res.redirect('finansijskakartica');
        } else
            res.render('index', { title: 'Clan 15' });
    
    
    });


};


exports.osnovica = function (req, res) {
    res.render('osnovica', { title: 'Unos osnovica' });
};

exports.finansijskakartica = function (req, res) {
    
    var podaci = connection.query('SELECT * FROM korisnik', function (error, results) {
        if (error) throw error
        console.log(results);
        
        res.render('finansijskakartica', { title: 'Finansijska kartica', podaci: results });
    })
};