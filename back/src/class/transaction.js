class Transaction {
	static #list = [];
	static #count = 1;
	balance = 0;

	constructor({type, amount, source}) {
		this.type = String(type);
		this.amount = Number(amount);
		this.source = String(source);

		this.initialBalance = Transaction.balance;
		this.transactionId = Transaction.#count++;
		this.date = new Date().getTime();
	};

	static create (data) {		
		let newTransaction = null;

		if (data.type === 'send' && data.amount < data.initialBalance) {
			newTransaction = new Transaction(data);

			Transaction.balance = data.initialBalance - data.amount;
		} else if (data.type === 'receive') {
			newTransaction = new Transaction(data);

			Transaction.balance = data.initialBalance + data.amount;
		}

		if (newTransaction) {			
			this.#list.push(newTransaction);
		}

		return newTransaction;

	};

	static getById (transactionId) {
		return (
			this.#list.find((item) => item.transactionId === Number(transactionId))
			 || null
		)
	}

	static getList = () => this.#list
};

module.exports = { Transaction };

