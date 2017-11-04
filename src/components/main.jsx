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
// FIXME: remove these
// import * as Blueprint from "@blueprintjs/core";
// import sassStyles from './Second.module.scss';

// import ResetPassword from '../components/user/reset_password';

// TODO:
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
                <div className='pt-card pt-elevation-0 welcome-splash'>
                  <h4>This is the main component</h4>
                  <input type='text' className='pt-input' placeholder='this is placeholder'/>
                  <button type="button" className="pt-button pt-icon-add pt-intent-primary">Button</button>
                </div>
              </div>
            );
          }} />

          <Route path="/profile" component={UserProfile} onEnter={requireAuth} />

          <Route path='/collect-info' render={(props) => {
            return (
              <div>
                <div className='pt-card pt-elevation-0 welcome-splash'>
                  <h4>Welcome to you-complete-me</h4>
                  <p>
                    Before you get started, we'd like to collect some additional information from you.
                  </p>
                  <div className="pt-form-group">
                    <label className="pt-label" for="pt-slack-input">
                      Slack User ID
                      <span className="pt-text-muted">(not required, but highly recommended!)</span>
                    </label>
                    <div className="pt-form-content">
                      <input 
                        id="pt-slack-input"
                        className="pt-input"
                        style="width: 300px;"
                        placeholder="Slack User ID"
                        type="text" />
                      <div className="pt-form-helper-text">This can be found in slack, by clicking team name in top left</div>
                    </div>
                  </div>


                  <input type='text' className='pt-input' placeholder='this is placeholder' />
                  <button type="button" className="pt-button pt-icon-add pt-intent-primary">Button</button>
                </div>
              </div>
            );
          }} />

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

  }
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser
  };
}

export default connect(mapStateToProps, null)(Main);
