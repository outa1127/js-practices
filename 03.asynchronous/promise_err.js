import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function all(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

run(
  "create table books (id integer primary key autoincrement, title text unique not null)",
)
  .then(() => run("insert into books (title) values (null)"))
  .then((result) => {
    console.log(result.lastID);
    return all("select * from book");
  })
  .then((rows) => {
    console.log(rows);
    return run("drop table if exists books");
  })
  .then(() => db.close())
  .catch((err) => {
    console.log(err);
    db.close();
  });
