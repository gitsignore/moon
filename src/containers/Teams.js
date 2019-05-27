import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
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
      teams: new TeamCollection()
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}${
          process.env.REACT_APP_API_ENTRYPOINT
        }`
      );

      const teamCollection = new TeamCollection(data);
      this.setState({ teams: teamCollection });

      const socket = openSocket(process.env.REACT_APP_API_URI);
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
        currentTeam: new TeamModel()
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
          currentUser: team
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
          errors
        };
      });
    }
  };

  handleEdit = async (event, id) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}${
          process.env.REACT_APP_API_ENTRYPOINT
        }/${id}`
      );

      const team = new TeamModel();
      this.setState(
        {
          showForm: true,
          editForm: true,
          errors: null,
          currentTeam: team.setTeam(data)
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
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URI}${
          process.env.REACT_APP_API_ENTRYPOINT
        }/${currentTeam.id}`
      );

      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.setState({
          currentTeam: new TeamModel(),
          showForm: false,
          editForm: false
        });
      }
    } catch (error) {
      throw error;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { currentTeam, editForm } = this.state;
    try {
      const { data } = await axios[editForm ? 'put' : 'post'](
        `${process.env.REACT_APP_API_URI}${
          process.env.REACT_APP_API_ENTRYPOINT
        }/${editForm ? currentTeam.id : ''}`,
        currentTeam
      );

      if (data.errors) {
        this.setState({ errors: data.errors });
      } else {
        this.setState({
          currentTeam: new TeamModel(),
          showForm: false,
          editForm: false
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
      editForm
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
