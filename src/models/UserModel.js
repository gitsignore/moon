import moment from 'moment';

class User {
  constructor(
    name = '',
    avatar = '',
    status = 'online',
    message = '',
    focusTime = {
      enabled: false,
      start: moment().format(),
      end: moment().format(),
    }
  ) {
    this.name = name;
    this.avatar = avatar;
    this.status = status;
    this.message = message;
    this.focus_time = focusTime;
  }

  setUser(data) {
    this.id = data.id;
    this.name = data.name;
    this.avatar = data.avatar;
    this.status = data.status;
    this.message = data.message;
    this.focus_time = data.focus_time;

    return this;
  }
}

export default User;
