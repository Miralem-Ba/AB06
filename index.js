"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var bank_account_1 = require("./src/bank/bank-account");
dotenv.config();
var app = express();
var bankAccount1 = new bank_account_1.BankAccount(1234, 1234, 100000000);
var bankAccount2 = new bank_account_1.BankAccount(56789, 5678, 100000000);
app.get('/', function (req, res) {
    var randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    var amount = randomIntFromInterval(1, 10000);
    bankAccount1.widthdraw(amount, 1234);
    bankAccount2.deposit(amount);
    bankAccount1.balance;
    bankAccount2.balance;
    res.status(200).json({ bankAccount2: bankAccount2.balance, bankAccount1: bankAccount1.balance, amount: amount });
});
var port = 3000;
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
