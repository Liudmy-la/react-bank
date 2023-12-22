class User {
	static #list = [];
	static #count = 1;	
	static #savings = 10;

	constructor({email, password}) {
		this.email = String(email).toLowerCase();
		this.password = String(password);

		this.isConfirm = false;
		this.userId = User.#count++;
		this.property = User.#savings
	};

	static create(data) {
		const user = new User(data);

		this.#list.push(user);

		return user;
	};

	static getByEmail(email) {
		return (
			this.#list.find((user) => user.email === String(email).toLowerCase())
			|| null
		)
	};

	static getById(userId) {
		return (
			this.#list.find((user) => user.userId === Number(userId))
			|| null
		)
	};

	// static updateEmail (incData, email) {
	// 	const user = User.getByEmail(incData);
	
	// 	if (user && email) {
	// 			user.email = String(newData.email).toLowerCase();
	// 		}
	// 		return true;
	// 	}
	
	// 	return false;
	// };

	static updatePass (email, password) {
		const user = User.getByEmail(email);
	
		if (user && password) user.password = String(password);
			
		return false;
	};

	static userConfirm (email) {
		const user = User.getByEmail(email);
	
		if (user) user.isConfirm = true;
			
		return false;
	};

	static getList = () => this.#list;
};

// static updateSavings

module.exports = { User };