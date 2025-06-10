import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(sql) {
  return new Promise((resolve) => {
    db.run(sql, function () {
      resolve(this);
    });
  });
}

function all(sql) {
  return new Promise((resolve) => {
    db.all(sql, function (_, rows) {
      resolve(rows);
    });
  });
}

run(
  "create table books (id integer primary key autoincrement, title text unique not null)",
)
  .then(() => run("insert into books (title) values ('test')"))
  .then((result) => {
    console.log(result.lastID);
    return all("select * from books");
  })
  .then((rows) => {
    console.log(rows);
    return run("drop table if exists books");
  })
  .then(() => db.close());
