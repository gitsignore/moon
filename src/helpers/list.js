import isBusy from './time';

const sortUsersListByPriority = usersList =>
  usersList.sort((user1, user2) => {
    const busyUser1 =
      isBusy(user1.focus_time.start, user1.focus_time.end, Date.now()) &&
      user1.focus_time.enabled;
    const busyUser2 =
      isBusy(user2.focus_time.start, user2.focus_time.end, Date.now()) &&
      user2.focus_time.enabled;

    return !busyUser1 && !busyUser2
      ? user1.id - user2.id
      : busyUser2 - busyUser1;
  });

export default sortUsersListByPriority;
