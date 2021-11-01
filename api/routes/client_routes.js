module.exports = app => {
    const client = require('../services/auth/auth');

    app.post("/signup/", client.createClient);
    app.post("/signin", client.getClient);
    app.put("/user/:id", client.updateClient);
}