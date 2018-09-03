class Team {
  constructor(name = '', avatar = '', message = '', users = []) {
    this.name = name;
    this.avatar = avatar;
    this.message = message;
    this.users = users;
  }

  setTeam(data) {
    this.id = data.id;
    this.name = data.name;
    this.avatar = data.avatar;
    this.message = data.message;
    this.users = data.users;

    return this;
  }
}

export default Team;
