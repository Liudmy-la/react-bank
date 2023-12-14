class User {
	static #list = [];
	static #count = 1;

	constructor({email, password}) {
		this.email = String(email).toLowerCase();
		this.password = String(password);

		this.isConfirm = false;
		this.userId = User.#count++;
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

	static update(userId, newData) {
		const user = this.getById(userId);
	
		if (user) {
			if (newData.email) {
				user.email = String(newData.email).toLowerCase();
			}
	
			if (newData.password) {
				user.password = String(newData.password);
			}
	
			return user;
		}
	
		return null;
	};

	static getList = () => this.#list;
};

module.exports = { User };