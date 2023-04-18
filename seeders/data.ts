require("dotenv").config();

const permissions = [
  { id: 1, name: "Get_Users", method: "GET", url: "/api/users" },
  { id: 2, name: "Get_User", method: "GET", url: "/api/users/1" },
  { id: 3, name: "Create_User", method: "POST", url: "/api/users" },
  { id: 4, name: "Update_User", method: "PUT", url: "/api/users/1" },
  { id: 5, name: "Delete_User", method: "DELETE", url: "/api/users/1" },

  { id: 6, name: "Get_Books", method: "GET", url: "/api/books" },
  { id: 7, name: "Get_Book", method: "GET", url: "/api/books/1" },
  { id: 8, name: "Create_Book", method: "POST", url: "/api/books" },
  { id: 9, name: "Update_Book", method: "PUT", url: "/api/books/1" },
  { id: 10, name: "Delete_Book", method: "DELETE", url: "/api/books/1" },

  { id: 11, name: "Get_Roles", method: "GET", url: "/api/roles" },
  { id: 12, name: "Get_Role", method: "GET", url: "/api/roles/1" },
  { id: 13, name: "Create_Role", method: "POST", url: "/api/roles" },
  { id: 14, name: "Update_Role", method: "PUT", url: "/api/roles/1" },
  { id: 15, name: "Delete_Role", method: "DELETE", url: "/api/roles/1" },

  {
    id: 16,
    name: "Loan_Book",
    method: "POST",
    url: "/api/user/1/books/1/loan",
  },
  {
    id: 17,
    name: "Return_Book",
    method: "PUT",
    url: "/api/user/1/books/1/return",
  },

  { id: 18, name: "Grant_User", method: "POST", url: "/api/user/1/grant" },
];

const roles = [
  {
    id: 1,
    name: "admin",
  },
  {
    id: 2,
    name: "author",
  },
  {
    id: 3,
    name: "user",
  },
];

const users = [
  {
    id: 1,
    firstname: process.env.ADMIN_FIRSTNAME,
    lastname: process.env.ADMIN_LASTNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
  {
    id: 2,
    firstname: "Author",
    lastname: "FirstAuthor",
    email: "author@stone.com",
    password: "Author*1",
  },
  {
    id: 3,
    firstname: "User",
    lastname: "SimpleUser",
    email: "user@stone.com",
    password: "User*1",
  },
];

const getAuthorID = () => {
  const authorIDs = [2, 3, 4];
  const randomKey = Math.floor(Math.random() * authorIDs.length);
  return authorIDs[randomKey];
};

const generateISBN = () => {
  let isbn = "978"; // préfixe standard pour les livres
  for (let i = 0; i < 9; i++) {
    isbn += Math.floor(Math.random() * 10); // ajoute 9 chiffres aléatoires
  }
  isbn += calculateISBNCheckDigit(isbn); // ajoute le chiffre de contrôle calculé
  return isbn;
};

const calculateISBNCheckDigit = (isbn: any) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i], 10);
    sum += i % 2 === 0 ? digit * 1 : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
};

const books = [
  {
    id: 1,
    title: "Les étoiles de midi",
    isbn: generateISBN(),
    quantity: 2,
    resume:
      "Bertille est DRH. Épanouie dans son travail, elle est enfermée dans son couple. Victime de harcèlement « matrimonial », elle tente de se défaire des serres de son époux pervers. Militaire de métier, son mari qu’elle surnomme l’Ex la surveille, planque devant son bureau, installe des mouchards dans son ordinateur, cache ses affaires dans le but de la faire passer pour folle.",
    isValid: true,
    status: true,
    publishedAt: new Date(),
    UserId: 2,
  },
  {
    id: 2,
    title: "Sur la route de grandeLine",
    isbn: generateISBN(),
    quantity: 3,
    resume:
      "Lorsque l’Ex invite son supérieur à dîner, Bertille oscille entre fou rire et désespoir, ce chapitre est une des bouffées d’oxygène qui émaillent la noirceur du roman. Bertille est à bout, mais pas encore assez pour réagir ou fuir, elle ne veut pas faire de peine à ses enfants. La douleur de ceux qu’elle aime lui est plus insupportable que la sienne.",
    isValid: true,
    status: true,
    publishedAt: new Date(),
    UserId: 2,
  },
  {
    id: 3,
    title: "Minato Namikaze le héros du village",
    isbn: generateISBN(),
    quantity: 1,
    resume:
      "Reconnue au travail, Bertille est chargée de mener un plan social en Belgique visant la fermeture d’un site industriel. Elle accomplit cette mission humainement difficile.",
    isValid: true,
    status: true,
    publishedAt: new Date(),
    UserId: 2,
  },
];
export { permissions, roles, users, books };
