const functions = require('firebase-functions')
const express = require('express');
// const path = require('path')
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(__dirname + '/build/'));

const db = mysql.createConnection({
  host: 'groupassignmentsdb.cibsusss4zqs.us-east-1.rds.amazonaws.com',
  user: 'team_db',
  password: '4A98d8Gx',
  port: 3306,
  database: 'companies',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected');
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.get('/parts', (req, res) => {
  let sql = 'SELECT * FROM parts'
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/parts/:id', (req, res) => {

  let sql = `SELECT * FROM parts WHERE partId = ${Number(req.params.id)}`
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      res.send(false);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/parts/create', (req, res) => {
 
  let sql = 'SELECT * FROM parts WHERE partId = ?';
  db.query(sql, Number(req.body.partId), (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      let sql = 'INSERT INTO parts VALUES (?,?,?)';
      let values = [Number(req.body.partId), req.body.partName, Number(req.body.qoh)];
      db.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        }
        res.send('create success');
      });
    } else {
      res.send('Part with ID ' + req.body.partId + ' already exist');
    }
  });
});

app.put('/parts/update', (req, res) => {

  let sql = 'SELECT * FROM parts WHERE partId = ?';
  db.query(sql, Number(req.body.partId), (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length !== 0) {
      let sql = 'UPDATE parts SET partName = ?, qoh = ? where partId = ?';
      let values = [req.body.partName, Number(req.body.qoh), Number(req.body.partId)];
      db.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        }
        res.send('update success');
      });
    } else {
      res.send('Part with ID ' + req.body.partId + ' doesn\'t exist');
    }
  });
});

app.get('/order', (req, res) => {

  let sql = 'SELECT * FROM partordersY order by jobName, userId, partId';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });

});

app.post('/order', (req, res) => {

  let sql = 'INSERT INTO partordersY Values (?,?,?,?)';
  let values = [req.body.jobName, Number(req.body.partId), req.body.userId,
  Number(req.body.qty)]
  db.query(sql, values, async (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send("inform company Y success")
    }
  })

});

app.get('*', (_req, res) => {
  res.send('Invalid url, please enter valid url path');
});

app.listen(port, () => {
  console.log(`Server is runing on port: ${port}`);
});

exports.companyy=  functions.https.onRequest(app);