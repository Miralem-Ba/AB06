import express, { Request , Response } from 'express';
import * as dotenv from 'dotenv';


const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

const port = 3000

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });