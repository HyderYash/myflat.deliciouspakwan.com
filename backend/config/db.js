const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("flatdb.sqlite");

// const executeQuery = (qry) => {
//   db.serialize(() => {
//     const a = db.run(qry);
//     console.log(a);
//     db.close();
//   });
// };
const executeQuery = async (qry) => {
  return new Promise((resolve) => {
    db.all(qry, function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = executeQuery;
