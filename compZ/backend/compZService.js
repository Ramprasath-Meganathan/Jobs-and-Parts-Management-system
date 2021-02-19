const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mySql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var db = mySql.createConnection({
  host: "groupassignmentsdb.cibsusss4zqs.us-east-1.rds.amazonaws.com",
  user: "team_db",
  password: "4A98d8Gx",
  port: "3306",
  database: "companies",
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("MySql Connected");
});

port = process.env.Port || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.get("/", (_req, res) => {
  try {
    res.send("Job Application started");
  } catch (error) {
    return res.status(404).send("error occçurred during initial setup");
  }
});

//maintain history for every search
app.post("/api/jobs/:jobName/", (req, res) => {
  let insertQuery = "Insert into Search values(?,?,?)";
  if (req.params.jobName) {
    values = [
      req.params.jobName.trim().toLowerCase(),
      new Date(),
      new Date().toLocaleTimeString(),
    ];
    db.query(insertQuery, values, (err, results) => {
      if (err) {
        res
          .status(404)
          .send("error occurred while inserting record in the database");
      }
      res.status(200).send("search record inserted successfully");
    });
  }
});

//authenticating the user
process.env.SECRETKEY = "secret";
app.post("/api/users", (req, res) => {
  if (req.body.username && req.body.password) {
    let sqlQuery = "select * from Users where email=? and password=?";
    let values = [req.body.username, req.body.password];
    db.query(sqlQuery, values, (err, results) => {
      if (err) {
        return res.status(404).send("credentials are wrong");
      }
      if (Object.keys(results).length > 0) {
        let token = jwt.sign(
          req.body.username.trim().toLowerCase(),
          process.env.SECRETKEY
        );
        return res.status(200).send(token);
      } else {
        return res.status(404).send(`credentials are wrong`);
      }
    });
  } else {
    res.status(404).send(`credentials are wrong`);
  }
});

app.post("/api/getOrder", (req, res) => {
  console.log("entered");
  if (req.body) {
    let array = req.body;
    let partIdList = [];
    let jobName = req.body[0].jobName;
    let userId = req.body[0].userId;
    for (let obj of array) {
      partIdList.push(obj.partId);
    }
    let selectQuery = `select * from JobParts where jobName='${jobName}' and userId='${userId}' and partId in (${partIdList})`;
    db.query(selectQuery, (err, selectedResults) => {
      if (err) {
        res.status(404).send("something went wrong with the database");
      }

      res.status(200).send(selectedResults);
    });
  } else {
    res.status(500).send("invalid request");
  }
});

//method to insert the order and in JobParts table
app.post("/api/updateOrder", (req, res) => {
  let insertQuery = "Insert into JobParts values(?,?,?,?,?,?,?)";
  if (req.body) {
    let array = req.body;
    let obj = "";
    let partIdList = [];
    let jobName = req.body[0].jobName;
    let userId = req.body[0].userId;
    for (obj of array) {
      partIdList.push(obj.partId);
    }
    let selectQuery = `select * from JobParts where jobName='${jobName}' and userId='${userId}' and partId in (${partIdList})`;
    db.query(selectQuery, (err, selectedResults) => {
      if (!selectedResults || Object.keys(selectedResults).length === 0) {
        if (err) {
          res.status(404).send("something went wrong with the database");
        }
        array.forEach((reqObj) => {
          values = [
            reqObj.partId,
            reqObj.jobName,
            reqObj.userId,
            reqObj.qty,
            new Date(),
            new Date().toLocaleTimeString(),
            reqObj.result,
          ];
          db.query(insertQuery, values, (err, results) => {
            if (err) {
              return res
                .status(404)
                .send("something went wrong with the database");
            }
          });
        });
        res.send("Jobparts inserted successfully");
      } else {
        orderedPartIds = [];
        selectedResults.forEach((element) => {
          orderedPartIds.push(element.partId);
        });
        res
          .status(500)
          .send(
            " user has already ordered  parts " +
              orderedPartIds +
              " for Job " +
              selectedResults[0].jobName
          );
      }
    });
  }
});

//searching all the jobs present
app.get("/api/searchhistory", (_req, res) => {
  let sqlQuery = "Select * from Search order by date desc, time desc limit 10";
  db.query(sqlQuery, (err, allSearchHistory) => {
    if (err) {
      return res
        .status(404)
        .send("error occurred while fetching jobs in the database");
    }
    if (Object.keys(allSearchHistory).length === 0) {
      return res.status(404).send("No jobs present in the database");
    }
    res.send(JSON.stringify(allSearchHistory, undefined, 4));
  });
});

//Invalid url handling
app.get("*", (_req, res) => {
  res.status(404).send("Invalid url, please enter valid url path");
});
