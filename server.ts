import express, { Application, Request, Response } from "express";
import db from "./models";
import { users } from "./seeders/users";
import { books } from "./seeders/books";
import { roles } from "./seeders/roles";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import selfRoutes from "./routes/self";
// import crypto from "crypto";

// CONFIGURATIONS

const app: Application = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SEEDERS DATA WILL BE ADD TO THE DATABASE ID NOT EXIST

const createRoles = async () => {
  roles.map((role) => {
    db.Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  });
};

// const cryptPassword:string = async (password: string) => {
//   let salt = await bcrypt.genSalt(10);
//   let hashedPassword:string = await bcrypt.hash(password, salt);
//   console.log("PASS : ", hashedPassword)
//   return hashedPassword;
// };

const createUsers = async () => {
  users.map((user) => {
    db.User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });
  });
};

const createBooks = async () => {
  books.map((book: { title: any }) => {
    db.Book.findOrCreate({
      where: { title: book.title },
      defaults: book,
    });
  });
};

//DATABASE SYNC AND SERVER START

db.sequelize
  .sync()
  .then(async () => {
    await createRoles();
    await createUsers();
    await createBooks();
    // const randomBytes = crypto.randomBytes(64).toString("hex");
    // console.log("yhe key Generated is : ", randomBytes, " END");

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err: any) => {
    console.error("Error syncing database", err);
  });

//ROUTING

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user", selfRoutes);
// app.get('/', (request:Request, response:Response) => {
//     response.status(200).send(`<div style="background-color: green;">Je crois que tout va bien</div>`)
// });
