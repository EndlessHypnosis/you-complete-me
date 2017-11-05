import React, { Component } from "react";
import { browserHistory } from 'react-router-dom';
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
import Dashboard from './dashboard';
// FIXME: remove these
import * as Blueprint from "@blueprintjs/core";
// import sassStyles from './Second.module.scss';

// import ResetPassword from '../components/user/reset_password';

// TODO:
// - Need to move all firebase database references to
//   probably class level properties? just something global

// TODO: move /collectinfo to new component

class Main extends Component {
  constructor(props) {
    super(props);
    this.onSkillLevelChange = this.onSkillLevelChange.bind(this);
    this.onFormCollectInfoSubmit = this.onFormCollectInfoSubmit.bind(this);
    this.state = {
      slackId: '',
      grade: '',
      skillLevel: '',
    };
  }

  onFormCollectInfoSubmit(event) {
    event.preventDefault();

    if (this.state.skillLevel === '') {
      //TODO: change to notification
      alert('Please select Training Level first')
    } else {
    //TODO: move to action
    fetch(`http://localhost:3100/api/v1/users/${this.props.currentUser.uid}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slack_id: this.state.slackId,
        grade: this.state.grade,
        skill_level: this.state.skillLevel
      })
    })
      .then(data => data.json())
      .then(response => {
        if (response.status == 200) {
          console.log('User info updated');
          // send user to get more info
          this.props.history.push('/dashboard');
        }
        if (response.status == 422) {
          console.log(response.error);
        }
      })
      .catch(error => console.log('Error Creating User', error));

    }

  }

  onSkillLevelChange(e) {
    console.log('EEE:', e);
    if (e.target.checked) {
      this.setState({ skillLevel: e.target.value });
    }
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
            : <div className='pt-callout pt-intent-primary'>
                Display Name can bet set in profile
                <button className='pt-button pt-small' onClick={() => {
                  this.props.history.push('/profile');
                }}>go there now</button>
              </div>
          }

          <Route exact path='/' render={(props) => {
            return (
              <div>
                <div className='pt-card pt-elevation-0 welcome-splash'>
                  <h4>Click here to continue: </h4>
                  <button onClick={() => {
                    this.props.history.push('/dashboard');
                  }} className='pt-button pt-intent-primary'>go to dashboard</button>
                </div>
              </div>
            );
          }} />

          <Route path="/profile" component={UserProfile} onEnter={requireAuth} />

          <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />

          <Route path='/collectinfo' render={(props) => {
            return (
              <div>
                <div className='pt-card pt-elevation-0 welcome-splash'>
                  <h4>Welcome to you-complete-me</h4>
                  <p>
                    Before you get started, we'd like to collect some additional information.
                  </p>
                  <form id="formCollectInfo" role="form" onSubmit={this.onFormCollectInfoSubmit}>
                    <div className="pt-form-group pt-callout">
                      <label className="pt-label" htmlFor="pt-slack-input">
                        Slack User ID
                        <span className="pt-text-muted">( optional, but recommended! )</span>
                      </label>
                      <div className="pt-form-content">
                        <i className='icon ion-at'></i>
                        <input 
                          id="pt-slack-input"
                          onChange={(e) => { this.setState({ slackId: e.target.value }); }}
                          name="ptslackinput"
                          className="pt-input"
                          style={{width: '200px'}}
                          placeholder="Slack ID"
                          type="text"
                          value={this.state.slackId} />
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
                          onChange={(e) => { this.setState({ grade: e.target.value }); }}
                          name="ptgradeinput"
                          className="pt-input"
                          style={{ width: '200px' }}
                          placeholder="Experience Level"
                          type="text"
                          value={this.state.grade} />
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
                        <input 
                          type='radio'
                          name='radio-start-skill-level'
                          value='Padawan'
                          onChange={this.onSkillLevelChange} />
                        <span className='pt-control-indicator'></span>
                        Start My Training at Padawan Level
                      </label>
                      <label className='pt-control pt-radio pt-large'>
                        <input
                          type='radio'
                          name='radio-start-skill-level'
                          value='Jedi Master'
                          onChange={this.onSkillLevelChange} />
                        <span className='pt-control-indicator'></span>
                        Advance to Jedi Master Level
                      </label>
                    </div>
                    <button 
                      className="pt-button pt-intent-primary"
                      type="submit">Save Info</button>
                  </form>
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
