import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "create table books (id integer primary key autoincrement, title text unique not null)",
  function () {
    db.run("insert into books (title) values ('test')", function () {
      console.log(this.lastID);

      db.all("select * from books", function (_err, rows) {
        console.log(rows);

        db.run("drop table if exists books", function () {
          db.close();
        });
      });
    });
  },
);
