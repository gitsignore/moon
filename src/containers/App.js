import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Client from '@gitsignore/http-client';
import PanelHeader from '../components/PanelHeader';
import PanelBody from '../components/PanelBody';
import PanelFooter from '../components/PanelFooter';
import userModel from '../constants/userModel';
import moon from '../assets/images/moon.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      editForm: false,
      users: [],
      currentUser: { ...userModel },
      time: Date.now()
    };

    const socket = openSocket(
      `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}`
    );
    socket.on('refresh', users => this.setState({ users }));

    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClickAvatar = this.handleClickAvatar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await Client.GET('', {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT
      });
      this.setState({ users: response });
      this.interval = setInterval(() => this.tick(), 1000);
    } catch (error) {
      console.error(error);
    }
  }

  tick() {
    this.setState({
      time: Date.now()
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleShowForm = () => {
    this.setState(
      prevState => ({
        showForm: !prevState.showForm,
        editForm: false,
        currentUser: { ...userModel }
      }),
      () =>
        this.state.showForm && window.scrollTo(0, this.form.current.offsetTop)
    );
  };

  handleEdit = id => {
    this.setState(
      prevState => {
        const currentUser = { ...prevState.users.find(user => user.id === id) };
        currentUser.focus_time = { ...currentUser.focus_time };
        return {
          showForm: true,
          editForm: true,
          currentUser: currentUser
        };
      },
      () =>
        this.state.showForm && window.scrollTo(0, this.form.current.offsetTop)
    );
  };

  handleClickAvatar = event => {
    const uri = event.target.src;
    this.setState(prevState => {
      prevState.currentUser.avatar = uri;
    });
  };

  handleChange = (event, ref = false) => {
    if (event && !event.target && ref) {
      this.setState(prevState => {
        prevState.currentUser.focus_time[ref] = event.seconds(0).format();
      });
    } else {
      const type = event.target.type;
      const isFocusTimeElement = event.target.id.match('focus_time_');
      const id = isFocusTimeElement
        ? event.target.id.replace('focus_time_', '')
        : event.target.id;
      const value =
        'checkbox' === type ? event.target.checked : event.target.value;

      this.setState(prevState => {
        const user = prevState.currentUser;
        if (isFocusTimeElement) {
          user.focus_time[id] = value;
        } else {
          user[id] = value;
        }

        return {
          currentUser: user
        };
      });
    }
  };

  handleDelete = async event => {
    event.preventDefault();
    try {
      const response = await Client.DELETE(`/${this.state.currentUser.id}`, {
        url: process.env.REACT_APP_API_URI,
        port: process.env.REACT_APP_API_PORT,
        entrypoint: process.env.REACT_APP_API_ENTRYPOINT
      });

      this.setState(prevState => {
        return {
          users: prevState.users.filter(
            user => user.id !== response.id.toString()
          ),
          currentUser: { ...userModel },
          showForm: false,
          editForm: false
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const editingUser = this.state.editForm;

    try {
      const response = await Client[editingUser ? 'PUT' : 'POST'](
        `/${editingUser ? this.state.currentUser.id : ''}`,
        this.state.currentUser,
        {
          url: process.env.REACT_APP_API_URI,
          port: process.env.REACT_APP_API_PORT,
          entrypoint: process.env.REACT_APP_API_ENTRYPOINT
        }
      );

      this.setState(prevState => {
        const userIndex = prevState.users.findIndex(
          user => user.id === response.id
        );

        if (userIndex < 0) {
          prevState.users.push(response);
        } else {
          prevState.users[userIndex] = response;
        }

        return {
          users: prevState.users,
          currentUser: { ...userModel },
          showForm: false,
          editForm: false
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { users, time, showForm, editForm, currentUser } = this.state;
    return (
      <div className="App container">
        <div className="columns">
          <div className="column col-6 col-lg-8 col-md-10 col-sm-12 col-mx-auto mt-2">
            <div className="navbar mt-2">
              <div className="navbar-section" />
              <div className="navbar-center">
                <img src={moon} className="logo" alt="moon-logo" />
                <h1 className="pt-2">&nbsp;Moon</h1>
              </div>
              <div className="navbar-section" />
            </div>
            <div className="column col-10 col-lg-12 col-mx-auto mt-2">
              <div className="panel">
                <PanelHeader time={time} />
                <div className="divider" />
                <PanelBody
                  users={users}
                  handleEdit={this.handleEdit}
                  time={time}
                />
                <div ref={this.form}>
                  <PanelFooter
                    currentUser={currentUser}
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
