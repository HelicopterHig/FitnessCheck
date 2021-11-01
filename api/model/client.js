const sql = require('../db/db');

const Client = function(client) {
    this.name = client.name;
    this.surname = client.surname;
    this.patronymic = client.patronymic;
    this.email = client.email;
    this.password = client.password;
    this.phone_num = client.phone_num;
    this.gender = client.gender;
    this.address = client.address;
    this.active = client.active;
    this.trainer_id = client.trainer_id;
}

Client.createClient = (newClient, result) => {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("create client: ", { id: res.insertId, ...newClient});
        result(null, {id: res.insertId, ...newClient});
    });
};

Client.getClient = (email, password, result) => {
    sql.query(`SELECT id FROM client WHERE email='${email}' AND password='${password}'`, (err, res) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res[0]);
    });
};

Client.updateClient = (user_id, name, surname, result) => {
    sql.query(`UPDATE client SET name='${name}', surname='${surname}' WHERE id=${user_id}'`, (err, res) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0){
            result({kind: "not fount"}, null);
            return;
        }

        result(null, {id: user_id});
    });
}

module.exports = Client;