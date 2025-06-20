//import dependencies
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cron from 'node-cron';
import axios from 'axios';
import { swaggerDoc } from './app/docs/doc.js';
//import router controllers
import { authRouter } from './app/routes/authRouter.js';
import { userRouter } from './app/routes/userRouter.js';
import { accountRouter } from './app/routes/accountRouter.js';

//start express app
const app = express();

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//router app
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/account', accountRouter);

//get root
app.get('/', (_, res) => {
  res.redirect('/docs');
});

//response errors
app.use('/', (err, _, res, __) => {
  if (err.message.substr(0, 1) === '{' && err.message.substr(-1) === '}') {
    //sends response for mapped errors
    const { status, error } = JSON.parse(err.message);
    res.status(status).send({ error: `${error}` });
  } else {
    //sends respose for unhandled errors
    res.status(500).send({ error: `${err.message}` });
  }
});

//backend listening
const { HOST, PORT } = process.env;
const host = HOST || 'http://localhost:3001';
const port = PORT || 3001;

app.listen(port, async () => {
  try {
    console.log(`API Started on host '${host}' and port '${port}'`);
  } catch (err) {
    console.log(err);
  }
});

// Added this function to keep the API alive and return the current IP address
const keepAlive = () => {
  axios
    .get('https://api.ipify.org?format=json')
    .then((response) => {
      const publicIp = response.data.ip;
      axios
        .get(host)
        .then(() =>
          console.log(
            `Keep-alive successful | Public IP: ${publicIp} | Port: ${port}`
          )
        )
        .catch((err) =>
          console.log(
            `Keep-alive failed | Public IP: ${publicIp} | Port: ${port} | Error:`,
            err.message
          )
        );
    })
    .catch((err) => console.log('Failed to get public IP:', err.message));
};

// Schedule a keep-alive every 12 minutes
cron.schedule('*/12 * * * *', keepAlive);
