"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const bank_1 = require("./bank/bank");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new database_1.Database();
        const bank = new bank_1.Bank(db);
        yield bank.loadAccounts();
        // Remove old accounts
        yield bank.removeAccounts();
        // Create new accounts
        if (bank.accounts.length === 0) {
            yield bank.createAccount(1234, 2000);
            yield bank.createAccount(5678, 5000);
        }
        // Show accounts
        const account1 = bank.accounts[0];
        const account2 = bank.accounts[1];
        console.log("Initial accounts");
        yield bank.showAccounts();
        // Do transaction
        yield bank.transaction(account1.accountNumber, account2.accountNumber, 1000, 1234);
        console.log("After Successfull Transaction");
        yield bank.showAccounts();
        // Do transaction (error due to insufficient funds)
        yield bank.transaction(account1.accountNumber, account2.accountNumber, 1500, 1234);
        console.log("After Failed Transaction");
        yield bank.showAccounts();
        // Do transaction with negative amount (error)
        yield bank.transaction(account1.accountNumber, account2.accountNumber, -1000, 1234);
        console.log("After Failed Transaction");
        yield bank.showAccounts();
        // Do transaction with wrong pincode (error)
        yield bank.transaction(account1.accountNumber, 0, 1000, 1234);
        console.log("After Failed Transaction");
        yield bank.showAccounts();
        // Load accounts from database
        yield bank.loadAccounts();
        console.log("After loading accounts from database");
        yield bank.showAccounts();
    });
}
main();
