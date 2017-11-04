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
import * as Blueprint from "@blueprintjs/core";
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

          <Route path='/collectinfo' render={(props) => {
            return (
              <div>
                <div className='pt-card pt-elevation-0 welcome-splash'>
                  <h4>Welcome to you-complete-me</h4>
                  <p>
                    Before you get started, we'd like to collect some additional information from you.
                  </p>
                  
                  <div className="pt-form-group pt-callout">
                    <label className="pt-label" htmlFor="pt-slack-input">
                      Slack User ID
                      <span className="pt-text-muted">( optional, but recommended! )</span>
                    </label>
                    <div className="pt-form-content">
                      <i className='icon ion-at'></i>
                      <input 
                        id="pt-slack-input"
                        className="pt-input"
                        style={{width: '200px'}}
                        placeholder="Slack ID"
                        type="text" />
                      <div className="pt-form-helper-text">This can be found in slack, by clicking team name in top left</div>
                    </div>
                  </div>

                  <div className="pt-form-group pt-callout pt-intent-primary">
                    <label className="pt-label" htmlFor="pt-grade-input">
                      Grade/Mod or Dev Level
                      <span className="pt-text-muted">( if in school, what grade, else junior/mid/senior )</span>
                    </label>
                    <div className="pt-form-content">
                      <input
                        id="pt-grade-input"
                        className="pt-input"
                        style={{ width: '200px' }}
                        placeholder="Experience Level"
                        type="text" />
                      <div className="pt-form-helper-text">This can be adjusted in your profile anytime!</div>
                    </div>
                  </div>

                  <div className="pt-form-group pt-callout">
                    <h5>
                      Start your Training as a Padawan or advance to Jedi Master?
                    </h5>
                    <p>
                      This choice will determine if you will start your training as a Jedi Master (teacher/mentor)
                      or as a Padawan (student/apprentice). If you are un-sure of what to choose, think about your skill
                      level with things like HTML, JavaScript, CSS, MVC Frameworks.
                      If you feel fairly comfortable with one or more of these areas,
                      you're welcome to join the Jedi Masters group.

                      If you're here to train on these (and many other) areas, we recommend starting as a Padawan. Don't worry,
                      you can easily graduate to become a Jedi Master later on :)
                    </p>
                    <label className='pt-control pt-radio pt-large'>
                      <input type='radio' name='radio-start-skill-level' />
                      <span className='pt-control-indicator'></span>
                      Start My Training at Padawan Level
                    </label>
                    <label className='pt-control pt-radio pt-large'>
                      <input type='radio' name='radio-start-skill-level'/>
                      <span className='pt-control-indicator'></span>
                      Advance to Jedi Master Level
                    </label>
                  </div>
                  <button type="button" className="pt-button pt-intent-primary">Save Info</button>
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
