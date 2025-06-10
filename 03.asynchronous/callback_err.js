import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "create table books (id integer primary key autoincrement, title text unique not null)",
  function () {
    db.run("insert into books (title) values (null)", function (err) {
      if (err) {
        console.error("Data create error", err.message);
      } else {
        console.log("データの挿入に成功。 ID:", this.lastID);
      }

      db.all("select * from book", function (err, rows) {
        if (err) {
          console.error("Data get error", err.message);
        } else {
          console.log(rows);
        }

        db.run("drop table if exists books", function () {
          db.close();
        });
      });
    });
  },
);
