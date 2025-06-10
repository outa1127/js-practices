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

async function main() {
  try {
    await run(
      "create table books (id integer primary key autoincrement, title text unique not null)",
    );

    const result = await run("insert into books (title) values ('test')");
    console.log(result.lastID);

    const rows = await all("select * from books");
    console.log(rows);

    await run("drop table if exists books");
  } finally {
    db.close();
  }
}

main();
