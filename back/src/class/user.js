class User {
	static #list = [];
	static #count = 1;

	constructor({email, password}) {
		this.email = String(email).toLowerCase();
		this.password = String(password);

		this.id = User.#count++;
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

	static getById(id) {
		return (
			this.#list.find((user) => user.id === Number(id))
			|| null
		)
	};

	static update(id, newData) {
		const user = this.getById(id);
	
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