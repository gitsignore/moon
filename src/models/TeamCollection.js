import TeamModel from './TeamModel';

class TeamCollection {
  constructor(teams = []) {
    this.teams = [];
    teams.map(team => {
      const teamModel = new TeamModel();
      return team instanceof TeamModel
        ? this.teams.push(team)
        : this.teams.push(teamModel.setTeam(team));
    });
  }

  getData() {
    return this.teams;
  }

  removeById(id) {
    this.teams = this.teams.slice().filter(team => team.id !== id);

    return this;
  }
}

export default TeamCollection;
