import express, { Application, Request, Response }  from "express";
import { Sequelize } from "sequelize";
import db  from './models';

const app:Application = express();
const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}).catch((err:any) => {
    console.error('Error syncing database', err);
  });

// const app:Application = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const sequelize = new Sequelize('sqlite:chinook.db')

// const Playlist = sequelize.define('playlist', {
//     id: {
//         field: 'id',
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
//     name: {
//         field: "Name",
//         type: Sequelize.STRING
//     }
// }, {
//     timestamps: false
// })
// const hostname: string = "127.0.0.1";
// const port = process.env.PORT || 3000;

// app.get('/', (request:Request, response:Response) => {
//     response.status(200).send(`<div style="background-color: green;">Je crois que tout va bien</div>`)
// });


// try {
//     app.listen(port, () => {
//         console.log(`Server running on http://localhost:${port}`)
//     })
// } catch (error:any) {
//     console.log(`Error occurred: ${error.message}`)
// }