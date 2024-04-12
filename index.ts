import * as express from 'express';
import * as dotenv from 'dotenv';
import { BankAccount } from './src/bank/bank-account';

dotenv.config();

const app = express();

const bankAccount1 = new BankAccount(1234, 1234, 100000000);
const bankAccount2 = new BankAccount(56789, 5678, 100000000);


app.get('/', (req, res) => {
  const randomIntFromInterval = (min: number, max: number): number => { 
      return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const amount = randomIntFromInterval(1, 10000);
  bankAccount1.widthdraw(amount, 1234);
  bankAccount2.deposit(amount); 
  
  bankAccount1.balance
  bankAccount2.balance
  
  
  res.status(200).json({ bankAccount2 : bankAccount2.balance, bankAccount1 : bankAccount1.balance, amount : amount })
});

const port = 3000

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });