let Books: any = [];

const generateRandomFourDigitNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

const getAuthorID = () => {
  const authorIDs = [2, 3, 4];
  const randomKey = Math.floor(Math.random() * authorIDs.length);
  return authorIDs[randomKey];
};

const getBooks = () => {
  for (let i: number = 0; i < 20; i++) {
    Books.push({
      title: "Title " + i,
      isbn: generateRandomFourDigitNumber(),
      resume: "Resume " + i,
      content: "Content " + i,
      status: 1,
      is_valid: 1,
      loanStatus: 0,
      published_at: new Date(),
      UserId: getAuthorID(),
    });
  }
};

getBooks();

export const books = Books;
