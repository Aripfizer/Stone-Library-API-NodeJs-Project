import express, { Application, Request, Response } from "express";
import db from "./models";
import { users } from "./seeders/users";
import { books } from "./seeders/books";
import { roles } from "./seeders/roles";
import { permissions } from "./seeders/permissions";
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





// const cryptPassword:string = async (password: string) => {
//   let salt = await bcrypt.genSalt(10);
//   let hashedPassword:string = await bcrypt.hash(password, salt);
//   console.log("PASS : ", hashedPassword)
//   return hashedPassword;
// };

const createUsers = async () => {
  let adminRole = await db.Role.findOne({ where: { name: "admin" } });
  let authorRole = await db.Role.findOne({ where: { name: "author" } });
  let userRole = await db.Role.findOne({ where: { name: "user" } });

  users.map(async (user) => {
    let roleList: any = [];

    if (user.RoleId === 1) {
      roleList.push(adminRole);
    } else if (user.RoleId === 2) {
      roleList.push(authorRole);
    } else {
      roleList.push(userRole);
    }
    
    const newUser = await db.User.findOrCreate({
      where: { email: user.email },
      defaults: {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        roles: roleList,
      },
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
    await createPermissions();
    let users = await db.User.findAll()
    console.log(users)
    // await createRoles();
    // await createUsers();
    // await createBooks();
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
