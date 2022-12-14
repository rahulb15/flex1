import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';

// routes
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import industryRouter from  './routes/industry.routes';
import technologyRouter from  './routes/technology.routes';
import featuresRouter from  './routes/features.routes';
import portfolioRouter from  './routes/portfolio.routes';
import mapRouter from  './routes/map.routes';

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
console.log("db", db)
// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/map', mapRouter);
app.use('/api/industry', industryRouter);
app.use('/api/technology', technologyRouter);
app.use('/api/features', featuresRouter);
app.use('/api/portfolio', portfolioRouter);




// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

export default app;
