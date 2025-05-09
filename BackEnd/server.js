import express from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/route.js';
import {connectDB,connectDB1} from './config/db.js';
import cors from 'cors';

dotenv.config();
const app = express();
connectDB();
connectDB1();

const port = process.env.PORT || 8001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());


const allowedOrigins = [
  'https://fast-fetch.vercel.app',
  'https://fastfetch-backend.onrender.com'
];


app.use(cors({
  origin:'https://fast-fetch.vercel.app',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true

}));

app.use(cookieParser());
app.use(routes);



app.get('/', (req, res) => {
  res.send('Hello, your Express server is running!');
});


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
