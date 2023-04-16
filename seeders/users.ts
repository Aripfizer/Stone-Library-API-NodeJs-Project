import bcrypt from "bcryptjs";

const cryptPassword = async () => {
  let salt =  await bcrypt.genSalt(10)!;
  let hashedPassword =  bcrypt.hash("admin", salt);
  return hashedPassword;
}



export const users = [
  {
    fullname: "DOSSOU Ariel",
    email: "arieldossou00@gmail.com",
    password:  "admin" ,
  },
  {
    fullname: "Jean Mark",
    email: "jean@gmail.com",
    password: "jean",
  },
  {
    fullname: "Frédérik Wilson",
    email: "frederick@gmail.com",
    password: "frederick",
  },
  {
    fullname: "Steeve Stylton",
    email: "stylton@gmail.com",
    password: "stylton",
  },
];
