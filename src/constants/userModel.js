import moment from 'moment';

const user = {
  id: `_${Math.random()
    .toString(36)
    .substr(2, 9)}`,
  name: '',
  avatar: '',
  status: 'online',
  message: '',
  focus_time: {
    enabled: false,
    start: moment().format(),
    end: moment().format()
  }
};

export default user;
