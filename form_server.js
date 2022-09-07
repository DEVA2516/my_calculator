var express = require("express");
var cors = require('cors');
var mysql = require("mysql");


app.listen(process.env.PORT, () => {
    console.log("server running....",process.env.PORT)
});


// ----------------------------- MYSQL connection --------------------------

var con = mysql.createConnection({
    'host': 'localhost',
    'user': 'mysql_node',
    'password': 'Password@123',
    'database': 'crud'
});

con.connect(err => {
    if (err) {
        console.error('error connecting ' + err.stack);
        return
    }
    console.log("connected as id" + con.threadId);
})


//------------------------get view details of user READ -------------------------------------------------

app.get("/sql", (req, res) => {
    sql = 'select * from user_message';
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json({ data });
        //console.log(data);
    });
});


//--------------------------- Post Insert Data  CREATE   ---------------------------------------------------

app.post("/postdata", (req, res) => {

    //console.log(req);
    //console.log(req.body);
    data = req.body;
    let sql = 'INSERT INTO user_message(name,email,message) values (?,?,?)';

    con.query(sql, [data.name, data.email, data.message], (err, result) => {

        if (err)
            console.log(err);

        //console.log(result);
        res.json({ result });
    })


})


//------------------------------get EDIT details -----------------------------------------------------------------

app.get("/getbyid", (req, res) => {
    //console.log(req.query);
    let sql = 'select * from user_message where id =' + req.query.id;

    con.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json({ data });
        //console.log(data);
    });
});

// -------------------------------update operation UPDATE ----------------------------------------------------

app.put("/updatebyid", (req, res) => {

    console.log(req.query);
    let data = req.body;

    let sql = "UPDATE user_message SET name = ?, email = ?, message = ? where id = ?";
    con.query(sql, [data.name, data.email, data.message, data.id], (err, result) => {

        if (err)
            console.log(err);

        console.log(result);
        res.json({ result });
    }
    );
});


app.get("/getbyid", (req, res) => {
    //console.log(req.query);

    let sql = 'select * from user_message where id =' + req.query.id;

    con.query(sql, (err, data) => {

        if (err) {
            console.log(err);
            res.send("something went wrong");
            return;
        }

        res.json({ data });
        //console.log(data);
    });
});

// -------------------------------update operation UPDATE ----------------------------------------------------

app.put("/updatebyid", (req, res) => {

    console.log(req.query);
    let data = req.body;

    let sql = "UPDATE user_message SET name = ?, email = ?, message = ? where id = ?";

    con.query(sql, [data.name, data.email, data.message, data.id], (err, result) => {

        if (err)
            console.log(err);

        //console.log(result);
        res.json({ result });
    }
    );
});


// -----------------------------DELETE Operation ------------------------------------------

app.delete("/deleteUserMsg", (req, res) => {
    data = req.body
    console.log(data);

    let sql = "UPDATE user_message SET is_deleted = 1 where id = ?";

    con.query(sql, [data.id], (err, result) => {
        console.log(result);

        if (err) {
            res.send(false);
        }
        else if (result.length == 0)
            res.send(false);

        else
            res.send(true);
    })
})

