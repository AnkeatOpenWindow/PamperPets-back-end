import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Location } from './entity/location';
import { User } from './entity/user';
import AppDataSource from './datasource';
import inventoryRouter from './routes/inventoryRoute';
import locationRouter from './routes/locationRoute';
import recipeRouter from './routes/recipeRoute';
import userRouter from './routes/userRoute';
//import ormconfig from '../ormconfig.json';
const cors = require('cors');
const app = express();

app.use(cors())

dotenv.config()

// import data source for anisilize
const appDataSource = AppDataSource



app.get('/', (req, res) => {
  res.send('Hello, Anke!');
});


//app.get('/users', async (req, res) => { // add async
//  const users = await appDataSource // add await
//   .manager.find(Lecturer)

  // find = get
  //use the managing capabilities to find all my lecturer items

  //console.log(users)
//  res.send(users)

//})

//app.get('/users/:id', async (req, res) => {

//  var id = parseInt(req.params.id);

  //appDataSource = connection to the db
  //getRepository = specifity the entity we want to connect to
  //gets = findBy / findOneBy / find
//  const user = await appDataSource.getRepository(Lecturer)
//   .findOneBy({ id: id }); // findOneBy = singel where and return 1

//  res.send(user)
//})


// IMPORT ENDPORTS
app.use('/inventory', inventoryRouter);
app.use('/location', locationRouter);
app.use('/recipe', recipeRouter);
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});