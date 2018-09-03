import UserModel from './UserModel';

class UserCollection {
  constructor(users = []) {
    this.users = [];
    users.map(user => {
      const userModel = new UserModel();
      return this.users.push(userModel.setUser(user));
    });
  }

  getData() {
    return this.users;
  }

  findOneById(id) {
    return this.users.find(user => user.id === id);
  }

  removeById(id) {
    this.users = this.users.slice().filter(user => user.id !== id);

    return this;
  }
}

export default UserCollection;
