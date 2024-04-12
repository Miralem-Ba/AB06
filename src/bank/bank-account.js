"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber, pincode, balance) {
        this._accountNumber = accountNumber;
        this._pincode = pincode;
        this._balance = balance;
    }
    BankAccount.prototype.deposit = function (amount) {
        if (amount < 0)
            throw new Error("Cannot deposit negative amount");
        this._balance += amount;
    };
    BankAccount.prototype.widthdraw = function (amount, pincode) {
        if (pincode !== this._pincode)
            return;
        if (amount < 0)
            throw new Error("Cannot widthdraw negative amount");
        if (amount > this._balance)
            throw new Error("Insufficient funds");
        this._balance -= amount;
    };
    BankAccount.prototype.getBalance = function (pincode) {
        if (pincode !== this._pincode)
            throw new Error("Invalid pincode");
        return this._balance;
    };
    Object.defineProperty(BankAccount.prototype, "accountNumber", {
        get: function () {
            return this._accountNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "pincode", {
        get: function () {
            return this._pincode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    return BankAccount;
}());
exports.BankAccount = BankAccount;
