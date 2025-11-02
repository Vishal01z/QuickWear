import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",        // ✅ Make sure this is your actual MySQL username
  password: "1234"     // ✅ And this is the correct password
});

con.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }

  console.log("✅ Connected to MySQL!");

  con.query("CREATE DATABASE IF NOT EXISTS quickwear", (err) => {
    if (err) {
      console.error("❌ Error creating database:", err.message);
    } else {
      console.log("✅ Database 'quickwear' created or already exists");
    }
    con.end();
  });
});
