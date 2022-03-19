const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/chamados", (req, res) => {
  const sql = "SELECT * FROM chamados";
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const chamados = data;

    res.render("chamados", { chamados });
  });
});
app.get("/chamado/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM chamados WHERE ?? = ?`;
  const data = ["id", id];
  conn.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const chamado = data[0];

    res.render("chamado", { chamado });
  });
});

app.post("/chamados/insert", (req, res) => {
  const title = req.body.title;
  const descricao = req.body.descricao;
  const sql = `INSERT INTO chamados (??,??) VALUES ( ?,?)`;
  const data = ["title", "descricao", title, descricao];
  conn.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/chamados");
  });
});

app.get("/chamado/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM chamados WHERE ??=?`;
  const data = ["id", id];
  conn.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const chamado = data[0];

    res.render("editchamado", { chamado });
  });
});
app.post("/chamado/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const descricao = req.body.descricao;

  const sql = `UPDATE chamados SET ?? = ?, ??= ? WHERE ?? = ? `;
  const data = ["title", title, "descricao", descricao, "id", id];
  conn.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/chamados");
  });
});

app.post("/chamado/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM chamados WHERE ??=?`;
  const data = ["id", id];

  conn.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/chamados");
  });
});
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});
conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("conectou no mysql");
  app.listen(3000);
});
