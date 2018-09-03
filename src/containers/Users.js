import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Client from '@gitsignore/http-client';
import PanelHeader from '../components/PanelHeader';
import PanelBody from '../components/PanelBody';
import PanelFooter from '../components/PanelFooter';
import UserCollection from '../models/UserCollection';
import UserModel from '../models/UserModel';
import TeamModel from '../models/TeamModel';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      editForm: false,
      team: new TeamModel(),
      users: new UserCollection(),
      search: '',
      errors: null,
      currentFilter: null,
      currentUser: new UserModel(),
      time: Date.now(),
    };

    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleClickAvatar = this.handleClickAvatar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClickFilter = this.handleClickFilter.bind(this);
  }

  async componentDidMount() {
    const { match, history } = this.props;

    try {
      const response = await Client.GET(`/${match.params.id}`, {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
      });

      const userCollection = new UserCollection(response.users);
      this.setState({ team: response, users: userCollection });

      const socket = openSocket(
        `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}`
      );
      socket.on(`update_team_${match.params.id}`, team =>
        this.setState({
          team: team || new TeamModel(),
          users:
            team && team.users
              ? new UserCollection(team.users)
              : new UserCollection(),
        })
      );
      this.interval = setInterval(() => this.tick(), 1000);
    } catch (error) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleShowForm = () => {
    this.setState(
      prevState => ({
        showForm: !prevState.showForm,
        editForm: false,
        currentUser: new UserModel(),
      }),
      () => {
        const { showForm } = this.state;
        return showForm
          ? window.scrollTo(0, this.form.current.offsetTop)
          : window.scrollTo(this.form.current.offsetTop, 0);
      }
    );
  };

  handleEdit = id => {
    const user = new UserModel();
    this.setState(
      prevState => ({
        showForm: true,
        editForm: true,
        errors: null,
        currentUser: user.setUser(prevState.users.findOneById(id)),
      }),
      () => {
        const { showForm } = this.state;
        return showForm
          ? window.scrollTo(0, this.form.current.offsetTop)
          : window.scrollTo(this.form.current.offsetTop, 0);
      }
    );
  };

  handleClickAvatar = avatar => {
    this.setState(prevState => {
      const user = Object.assign({}, prevState.currentUser);
      user.avatar = avatar;

      return {
        currentUser: user,
      };
    });
  };

  handleClickFilter = filterName => {
    this.setState(prevState => ({
      currentFilter: prevState.currentFilter !== filterName ? filterName : null,
    }));
  };

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  clearSearch = () => this.setState({ search: '' });

  handleChange = (event, ref = false) => {
    if (event && !event.target && ref) {
      this.setState(prevState => {
        const user = Object.assign({}, prevState.currentUser);
        user.focus_time[ref] = event.seconds(0).format();

        return {
          currentUser: user,
        };
      });
    } else {
      const { type } = event.target;
      const isFocusTimeElement = event.target.id.match('focus_time_');
      const id = isFocusTimeElement
        ? event.target.id.replace('focus_time_', '')
        : event.target.id;
      const value =
        type === 'checkbox' ? event.target.checked : event.target.value;

      this.setState(prevState => {
        const user = prevState.currentUser;
        const errors = Object.assign({}, prevState.errors);
        delete errors[id];
        if (isFocusTimeElement) {
          user.focus_time[id] = value;
        } else {
          user[id] = value;
        }

        return {
          currentUser: user,
          errors,
        };
      });
    }
  };

  handleDelete = async event => {
    event.preventDefault();

    const { currentUser } = this.state;
    const { match } = this.props;
    try {
      const response = await Client.DELETE(
        `/${match.params.id}/users/${currentUser.id}`,
        {
          url: process.env.REACT_APP_API_URI,
          port: process.env.REACT_APP_API_PORT,
          entrypoint: process.env.REACT_APP_API_ENTRYPOINT,
        }
      );

      this.setState(prevState => ({
        users: prevState.users.removeById(response.userId.toString()),
        currentUser: new UserModel(),
        showForm: false,
        editForm: false,
      }));
    } catch (error) {
      throw error;
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { currentUser, editForm } = this.state;
    const { match } = this.props;
    try {
      const response = await Client[editForm ? 'PUT' : 'POST'](
        `/${match.params.id}/users/${editForm ? currentUser.id : ''}`,
        currentUser,
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
          const userIndex = prevState.users
            .getData()
            .findIndex(user => user.id === response.id);

          const users = prevState.users.getData().slice();
          if (userIndex < 0) {
            users.push(response);
          } else {
            users[userIndex] = response;
          }

          const userCollection = new UserCollection(users);
          return {
            users: userCollection,
            currentUser: new UserModel(),
            showForm: false,
            editForm: false,
          };
        });
      }
    } catch (error) {
      throw error;
    }
  };

  tick() {
    this.setState({
      time: Date.now(),
    });
  }

  render() {
    const {
      users,
      team,
      errors,
      time,
      search,
      showForm,
      editForm,
      currentUser,
      currentFilter,
    } = this.state;
    return (
      <div className="panel">
        <PanelHeader
          title={team.name}
          subtitle={team.message}
          avatar={team.avatar}
          uri={team.id}
          search={search}
          time={time}
          showBackLink
          currentFilter={currentFilter}
          handleSearch={this.handleSearch}
          clearSearch={this.clearSearch}
          handleClickFilter={this.handleClickFilter}
        />
        <div className="divider" />
        <PanelBody
          dataCollection={users}
          search={search}
          currentFilter={currentFilter}
          handleEdit={this.handleEdit}
          time={time}
        />
        <div ref={this.form}>
          <PanelFooter
            context="user"
            data={currentUser}
            errors={errors}
            buttonText="Add member"
            showForm={showForm}
            editForm={editForm}
            handleShowForm={this.handleShowForm}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleClickAvatar={this.handleClickAvatar}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default Users;
