import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Client from '@gitsignore/http-client';
import PanelHeader from '../components/PanelHeader';
import PanelBody from '../components/PanelBody';
import PanelFooter from '../components/PanelFooter';
import TeamCollection from '../models/TeamCollection';
import TeamModel from '../models/TeamModel';

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      editForm: false,
      search: '',
      errors: null,
      currentTeam: new TeamModel(),
      teams: new TeamCollection(),
    };

    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await Client.GET('', {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
      });

      const teamCollection = new TeamCollection(response);
      this.setState({ teams: teamCollection });

      const socket = openSocket(
        `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}`
      );
      socket.on('update_teams', teams => {
        const socketTeamCollection = new TeamCollection(teams);
        return this.setState({ teams: socketTeamCollection });
      });
    } catch (error) {
      throw error;
    }
  }

  handleShowForm = () => {
    this.setState(
      prevState => ({
        showForm: !prevState.showForm,
        editForm: false,
        errors: null,
        currentTeam: new TeamModel(),
      }),
      () => {
        const { showForm } = this.state;
        return showForm
          ? window.scrollTo(0, this.form.current.offsetTop)
          : window.scrollTo(this.form.current.offsetTop, 0);
      }
    );
  };

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  clearSearch = () => this.setState({ search: '' });

  handleChange = (event, ref = false) => {
    if (event && !event.target && ref) {
      this.setState(prevState => {
        const team = Object.assign({}, prevState.currentTeam);

        return {
          currentUser: team,
        };
      });
    } else {
      const { id, type } = event.target;
      const value =
        type === 'checkbox' ? event.target.checked : event.target.value;

      this.setState(prevState => {
        const team = prevState.currentTeam;
        const errors = Object.assign({}, prevState.errors);
        delete errors[id];
        team[id] = value;

        return {
          currentTeam: team,
          errors,
        };
      });
    }
  };

  handleEdit = async (event, id) => {
    event.preventDefault();

    try {
      const response = await Client.GET(`/${id}`, {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
      });

      const team = new TeamModel();
      this.setState(
        {
          showForm: true,
          editForm: true,
          errors: null,
          currentTeam: team.setTeam(response),
        },
        () => {
          const { showForm } = this.state;
          return showForm
            ? window.scrollTo(0, this.form.current.offsetTop)
            : window.scrollTo(this.form.current.offsetTop, 0);
        }
      );
    } catch (error) {
      throw error;
    }
  };

  handleDelete = async event => {
    event.preventDefault();

    const { currentTeam } = this.state;
    try {
      const response = await Client.DELETE(`/${currentTeam.id}`, {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
      });

      this.setState(prevState => ({
        teams: prevState.teams.removeById(response.id.toString()),
        currentTeam: new TeamModel(),
        showForm: false,
        editForm: false,
      }));
    } catch (error) {
      throw error;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { currentTeam, editForm } = this.state;
    try {
      const response = await Client[editForm ? 'PUT' : 'POST'](
        `/${editForm ? currentTeam.id : ''}`,
        currentTeam,
        {
          url: process.env.REACT_APP_API_URI,
          port: process.env.REACT_APP_API_PORT,
          entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
        }
      );

      if (response.errors) {
        this.setState({ errors: response.errors });
      } else {
        this.setState(prevState => {
          const teamIndex = prevState.teams
            .getData()
            .findIndex(team => team.id === response.id);

          const teams = prevState.teams.getData().slice();
          if (teamIndex < 0) {
            teams.push(response);
          } else {
            teams[teamIndex] = response;
          }

          const teamCollection = new TeamCollection(teams);
          return {
            teams: teamCollection,
            currentTeam: new TeamModel(),
            showForm: false,
            editForm: false,
          };
        });
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    const {
      teams,
      currentTeam,
      errors,
      showForm,
      search,
      editForm,
    } = this.state;

    return (
      <div className="panel">
        <PanelHeader
          search={search}
          handleSearch={this.handleSearch}
          clearSearch={this.clearSearch}
        />
        <div className="divider" />
        <PanelBody
          dataCollection={teams}
          search={search}
          handleEdit={this.handleEdit}
        />
        <div ref={this.form}>
          <PanelFooter
            data={currentTeam}
            errors={errors}
            showForm={showForm}
            editForm={editForm}
            handleShowForm={this.handleShowForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default Teams;
