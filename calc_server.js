var express = require("express");
var cors = require('cors');
//var mysql = require("mysql");

//----------------------------------calculator ----------------------------------------------------------'

app.get('/calculator', (req, res) => {

    let calc = req.query.calc;
    console.log(calc);

    let v1 = 0, v = '', op = '';
    let count = 0;
    let a = calc;

    function isnumber(n) {
        return (n >= '0' && n <= '9') ? true : false;
    }

    for (let i = 0; i < a.length; i++) {

        if (isnumber(a[i]))
            v += a[i];

        else {

            count++;

            if (count % 2 == 0) {
                v1 = operateEval(v, op, v1);
                v = '';
                count = 1;
            }

            else {
                v1 = +v;
                v = ''
            }
            op = a[i]
        }
    }

    function operateEval(v, op, v1) {

        if (op == '*') {
            v1 *= +v;
            v = '';
        }
        else if (op == '/') {
            v1 /= +v;
            v = '';
        }
        else if (op == '+') {
            v1 += +v;
            v = '';
        }
        else if (op == '-') {
            v1 -= +v;
            v = '';
        }
        else {
            v1 %= +v;
            v = '';
        }
        return v1;
    }
    //console.log(operateEval(v,op,v1));
    res.send("" + operateEval(v, op, v1));
});

app.listen(process.env.PORT, () => {
    console.log("server running....",process.env.PORT)
});
