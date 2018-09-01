import isBusy from './time';

const sortUsersListByPriority = (usersList, filter = null) =>
  usersList
    .filter(
      user =>
        filter
          ? user.status === filter ||
            ('busy' === filter &&
              user.focus_time.enabled &&
              isBusy(user.focus_time.start, user.focus_time.end, Date.now()))
          : true
    )
    .sort((user1, user2) => {
      const busyUser1 =
        user1.focus_time.enabled &&
        isBusy(user1.focus_time.start, user1.focus_time.end, Date.now());
      const busyUser2 =
        user2.focus_time.enabled &&
        isBusy(user2.focus_time.start, user2.focus_time.end, Date.now());

      return !busyUser1 && !busyUser2
        ? user1.id - user2.id
        : busyUser2 - busyUser1;
    });

export default sortUsersListByPriority;
