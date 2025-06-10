import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("drop table if exists books");
  db.run(
    "create table if not exists books (id integer primary key autoincrement, title text unique not null)",
  );
  db.run("insert into books (title) values ('test')");
  db.run("insert into books (title) values ('test2')");
  db.each("select * from books", (err, row) => {
    console.log(`${row.title}`);
  });
});

db.close();
