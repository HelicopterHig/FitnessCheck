const Client = require('/home/mc/FitnessCheck/api/model/client');

var crypto = require('crypto');
var fs = require('fs');
var jwt = require('jsonwebtoken')

function generateHashPassword(password) {
    var hash = crypto.createHash('sha1').update(password).digest('hex');
    return hash;
}

var privateKey = fs.readFileSync('/home/mc/FitnessCheck/private.key');
var publicKey = fs.readFileSync('/home/mc/FitnessCheck/public.key');

var i = 'FitnessCheck';
var s = 'FitnessCheck@gmail.com';
var a = 'FitnessCheck.com';

var tokOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
};

function generateToken(id) {
    var payload = {
        data1: id,
    };

    var token = jwt.sign(payload, privateKey, tokOptions);
    return token;
}

function verUser(token) {
    var legit = jwt.verify(token, publicKey, tokOptions);
    console.log("\nJWT verification result: " + JSON.stringify(legit));
    return JSON.stringify(legit);
}

exports.createClient = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not empty"
        });
    }

    var passHash = generateHashPassword(req.body.password);

    const client = new Client({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        email: req.body.email,
        password: passHash,
        phone_num: req.body.phone_num,
        gender: req.body.gender,
        address: req.body.address,
        active: req.body.active,
        trainer_id: req.body.trainer_id
    });

    Client.createClient(client, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Client"
            });
        } else {
            res.send(data);
        }
    });
};

exports.getClient = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not empty"
        });
    }

    var email = req.body.email;
    var password = req.body.password;

    var passHash = generateHashPassword(password);
    
    Client.getClient(email, passHash, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Not found client."
            });
        } else {
            var token = generateToken(data);
            res.send({token: token});
        }
    });
};
