"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANK_ACCOUNT_TABLE = void 0;
const BANK_ACCOUNT_TABLE = `
CREATE TABLE IF NOT EXISTS bank_accounts (
    accountNumber INT NOT NULL AUTO_INCREMENT,
    balance INT NOT NULL DEFAULT 0,
    pincode INT NOT NULL,
    PRIMARY KEY (accountNumber)
);
`;
exports.BANK_ACCOUNT_TABLE = BANK_ACCOUNT_TABLE;
