const getDate = (time) => {
	const date = new Date(time);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	const formattedDate = `${day}.${month} ${hours}:${minutes}`;

	return formattedDate;
} 

class Transaction {
	static #list = [];
	static #count = 1;
	static balance = 12000;

	constructor(type, amount, source) {
		this.type = String(type).toLowerCase();
		this.amount = Number(amount);
		this.source = String(source).toLowerCase();

		this.initialBalance = Transaction.balance;
		this.transactionId = Transaction.#count++;
		this.date = getDate(new Date().getTime());
	};

	

	static create (data) {		
		let newTransaction = new Transaction(data);

		if (data.type === 'send' && data.amount < data.initialBalance) {			
			Transaction.balance = data.initialBalance - data.amount;
		} 
		else if (data.type === 'receive') {
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

