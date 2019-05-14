import isBusy from './time';

const sortUsersListByPriority = (usersList, filter = null, search = '') =>
  usersList
    .filter(user =>
      filter
        ? user.status === filter ||
          (filter === 'busy' &&
            user.focus_time.enabled &&
            isBusy(user.focus_time.start, user.focus_time.end, Date.now()))
        : true
    )
    .filter(
      user =>
        user.name.toLowerCase().match(search.toLowerCase().trim()) ||
        user.message.toLowerCase().match(search.toLowerCase().trim()) ||
        user.location.toLowerCase().match(search.toLowerCase().trim())
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

const filterTeamsBySearch = (teamsList, search = '') =>
  teamsList.filter(
    team =>
      team.name.toLowerCase().match(search.toLowerCase().trim()) ||
      team.message.toLowerCase().match(search.toLowerCase().trim())
  );

export { sortUsersListByPriority, filterTeamsBySearch };
