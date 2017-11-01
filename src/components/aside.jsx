import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, logoutUser } from "../actions/firebase_actions";
import Notifications, { success } from 'react-notification-system-redux';


const notificationStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      margin: '10px 5px 2px 1px',
      borderRadius: '12px',
      fontSize: '18px',
    },

    success: { // Applied only to the success notification item
      color: '#000000',
      fontSize: '20px',
      backgroundColor: '#ffffff',
      borderTop: '4px solid darkgray',
      borderBottom: '4px solid darkgray'
    }
  },
  Title: {
    DefaultStyle: {
      fontSize: '18px',
      margin: '10px',
      padding: 0,
      fontWeight: 'bold'
    },

    success: {
      color: '#000000'
    }
  },
  Action: {
    DefaultStyle: {
      background: '#ffffff',
      borderRadius: '3px',
      fontSize: '16px',
      padding: '8px 20px',
      fontWeight: 'bold',
      margin: '10px',
      border: 0
    },

    success: {
      backgroundColor: '#c74148',
      color: '#ffffff',
      cursor: 'pointer'
    }
  }
}



// TO-DO:
// when changing display name in profile,
// it doesn't update till you get back to root

class Aside extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
  }


  renderUserMenu() {
    // if current user exists and user id exists than make user navigation
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <div>

          <button onClick={() => {
            this.props.history.push('/profile');
          }}>Profile</button>

          <button onClick={() => {
            this.props.logoutUser().then(data => {
              this.props.fetchUser().then(data => {
                this.props.history.push('/logout');
              })
            });
          }}>Logout</button>

        </div>
      );
    } else {
      return (
        <div>

          <button onClick={() => {
            this.props.history.push('/login');
          }}>Login</button>

          <button onClick={() => {
            this.props.history.push('/register');
          }}>Register</button>

        </div>
      );
    }
  }

  render() {
    return (
      <div>

        <button onClick={() => {
          this.props.history.push('/');
        }}>Home</button>

        {this.renderUserMenu()}
        <Notifications notifications={this.props.notifications}
          style={notificationStyle}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, logoutUser, success }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    notifications: mall.notifications
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
