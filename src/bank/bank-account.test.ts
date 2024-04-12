import { BankAccount } from './bank-account';

describe('BankAccount', () => {
    const bankAccount = new BankAccount(123456, 9876, 1000);
    it('show balance', () => {
        const balance = bankAccount.getBalance(9876)

        expect(balance).toBe(1000)
    })

describe("withdraw", () => {
    it('test', () => {
        bankAccount.widthdraw(500, 9876);
        expect(bankAccount.balance).toBe(500);
    })

});

describe("deposit", () => {
    it('test', () => {
        bankAccount.deposit(1500);
        expect(bankAccount.balance).toBe(2000);
    })
    
    });
    
})

