class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(trans => (balance += trans.value));
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    this.isAllowed() ? this.account.addTransaction(this) : console.log(`transaction failed: insufficient funds`)
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance - this.amount > 0;
  }
}

// DRIVER CODE BELOW

const myAccount = new Account("billybob");

console.log("Starting Balance:", myAccount.balance);

const t1 = new Deposit(120.0, myAccount);
t1.commit();

const t2 = new Withdrawal(50.0, myAccount);
t2.commit();

const t3 = new Withdrawal(200.0, myAccount)
t3.commit();
console.log("Ending Balance:", myAccount.balance);
