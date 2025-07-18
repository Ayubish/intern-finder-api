import express from 'express';
const app = express();


app.use(express.json());


app.get('/home', (req, res) => {
  res.send('Hello from app.ts');
});


export default app;
