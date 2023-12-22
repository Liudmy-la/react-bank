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
	
	static getByData(data) {
		if (typeof(data) === 'number') {
			return (
				this.#list.find((user) => user.userId === data)
				|| null
			)
		} else {
			return (
				this.#list.find((user) => user.email === data.toLowerCase())
				|| null
			)
		}
	};

	// static updateData (currentData, newData) {
	// 	const user = User.getByData(incData);
		// 	if (user && email) {
	// 			user.email = String(newData.email).toLowerCase();
	// 		}
	// 		return true;
	// 	}
	// 	return false;
	// };

	static updatePass (email, password) {
		const user = User.getByData(email);
	
		if (user && password) user.password = String(password);
			
		return false;
	};

	static userConfirm (email) {
		const user = User.getByData(email);
	
		if (user) user.isConfirm = true;
			
		return false;
	};

	static getList = () => this.#list;
};

module.exports = { User };