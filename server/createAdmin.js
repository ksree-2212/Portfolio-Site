// Run once, locally, to create your admin login:
//   node createAdmin.js <username> <password>
// There is no public signup route — this is the only way to create an admin,
// which keeps the login endpoint from being usable to register new accounts.

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const [, , username, password] = process.argv;

if (!username || !password) {
  console.error("Usage: node createAdmin.js <username> <password>");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.findOneAndUpdate(
      { username },
      { username, passwordHash },
      { upsert: true }
    );
    console.log(`Admin "${username}" created/updated.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
