import moment from 'moment';

const isBusy = (dateStart, dateEnd, time) =>
  moment(time).isAfter(dateStart) && moment(time).isBefore(dateEnd);

export default isBusy;
