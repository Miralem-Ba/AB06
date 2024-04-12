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
exports.Bank = void 0;
const _1 = require(".");
class Bank {
    constructor(database) {
        this.transaction = (accountNumberFrom, accountNumberTo, amount, pincode) => __awaiter(this, void 0, void 0, function* () {
            const conn = yield this._database.beginTransaction();
            if (!conn) {
                console.log("Could not start transaction");
                return;
            }
            try {
                const bankAccountFromIndex = this._accounts.findIndex((account) => account.accountNumber === accountNumberFrom);
                const bankAccountToIndex = this._accounts.findIndex((account) => account.accountNumber === accountNumberTo);
                if (bankAccountFromIndex === -1 || bankAccountToIndex === -1) {
                    throw new Error("Account not found");
                }
                const bankAccountFrom = this._accounts[bankAccountFromIndex];
                const bankAccountTo = this._accounts[bankAccountToIndex];
                bankAccountFrom.widthdraw(amount, pincode);
                bankAccountTo.deposit(amount);
                yield conn.query(`UPDATE bank_accounts SET balance = ${bankAccountFrom.balance} WHERE accountNumber = ${bankAccountFrom.accountNumber};`);
                yield conn.query(`UPDATE bank_accounts SET balance = ${bankAccountTo.balance} WHERE accountNumber = ${bankAccountTo.accountNumber};`);
                yield this._database.commitTransaction(conn);
                console.log("Transaction successful");
            }
            catch (err) {
                yield this._database.rollbackTransaction(conn);
                console.log(err);
            }
        });
        this._database = database;
        this._accounts = [];
    }
    loadAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this._database.executeSQL("SELECT * FROM bank_accounts;");
            this._accounts = rows.map((row) => new _1.BankAccount(row.accountNumber, row.pincode, row.balance));
        });
    }
    createAccount(pincode, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertId } = yield this._database.executeSQL(`INSERT INTO bank_accounts (pincode, balance) VALUES (${pincode}, ${balance});`);
            const account = new _1.BankAccount(Number(insertId), pincode, balance);
            this._accounts.push(account);
        });
    }
    showAccounts() {
        this._accounts.forEach((account) => {
            console.log(account);
        });
    }
    get accounts() {
        return this._accounts;
    }
    removeAccounts() {
        this._database.executeSQL("DELETE FROM bank_accounts;");
        this._accounts = [];
    }
}
exports.Bank = Bank;
