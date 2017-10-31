import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import requireAuth from '../utils/authenticated';
// import FireBaseUtils from '../utils/firebase';
// import TasksIndex from '../components/tasks/tasks_index';
// import SnorIndex from '../components/snor/snor_index';
import UserLogin from './user/login';
import UserRegister from './user/register';
import UserProfile from './user/profile';
// import ResetPassword from '../components/user/reset_password';

// TO-DO:
// - Need to move all firebase database references to
//   probably class level properties? just something global

class Main extends Component {
  constructor(props) {
    super(props);
  }

  renderLoginCheck() {
    // if current user exists and user id exists than make user navigation
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <div>
          {this.props.currentUser.displayName
            ? <p>
                Hello, {this.props.currentUser.displayName}
              </p>
            : <div>
                <span>Display name can bet set in profile</span>
                <button onClick={() => {
                  this.props.history.push('/profile');
                }}>
                  go to profile
                </button>
              </div>
          }

          <Route exact path='/' render={(props) => {
            return (
              <div>
                <span>
                  This is the main component
                </span>
              </div>
            );
          }} />

          <Route path="/profile" component={UserProfile} onEnter={requireAuth} />

        </div>
      );
    }
    else {
      return (
        <div>
          <Route exact path="/" render={(props) => {
            return (
              <div>

                <p>No user signed in</p>

                <p>
                  This application requires you to register an account.
                </p>

              </div>
            );
          }} />
          <Route path="/login" component={UserLogin} />
          <Route path="/register" component={UserRegister} />

        </div>
      );
    }
  }

  render() {

    return (
      <div>
        {this.renderLoginCheck()}
      </div>
    );

  } // end render
} // end class

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    userPath: mall.userPath
  };
}

export default connect(mapStateToProps, null)(HomeIndex);
