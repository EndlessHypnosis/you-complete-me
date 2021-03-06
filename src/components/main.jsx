import React, { Component } from "react";
import { browserHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import requireAuth from '../utils/authenticated';
import UserLogin from './user/login';
import UserRegister from './user/register';
import UserProfile from './user/profile';
import UserLogout from './user/logout';
import Dashboard from './dashboard';
import Booking from './booking';
import { addUser } from '../actions/index';
import { getPGUser } from '../utils/local_api';
import { fetchUser } from "../actions/firebase_actions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.fetchPGuser();
    this.onSkillLevelChange = this.onSkillLevelChange.bind(this);
    this.onFormCollectInfoSubmit = this.onFormCollectInfoSubmit.bind(this);
    this.state = {
      slackId: '',
      grade: '',
      skillLevel: '',
    };
  }

  fetchPGuser() {
    if (this.props.currentUser && this.props.currentUser.uid) {
      getPGUser(this.props.currentUser.uid)
        .then(user => {
          this.props.addUser(user);
        })
    }
  }

  onFormCollectInfoSubmit(event) {
    event.preventDefault();
    if (this.state.skillLevel === '') {
      //TODO: change to notification
      alert('Please select Training Level first')
    } else {
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
    if (e.target.checked) {
      this.setState({ skillLevel: e.target.value });
    }
  }

  renderLoginCheck() {
    if (this.props.currentUser && this.props.currentUser.uid) {
      return (
        <div>
          {this.props.currentUser.displayName
            ? <p>
                Hello, {this.props.currentUser.displayName}
              </p>
            : <div className='pt-callout pt-intent-primary pt-intro-secondary'>
                You can set your display name here:
                <button className='pt-button pt-small pt-intent-primary' onClick={() => {
                  this.props.history.push('/profile');
                }}>profile</button>
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

          <Route path="/booking" component={Booking} onEnter={requireAuth} />

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
                      <label className='pt-control'>
                        <input 
                          type='radio'
                          name='radio-start-skill-level'
                          value='Padawan'
                          onChange={this.onSkillLevelChange} />
                        <span className='pt-control-indicator'></span>
                        Start My Training at Padawan Level
                      </label>
                      <label className='pt-control'>
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
              <div className='pt-callout'>
                <h3>No user signed in</h3>
                <p>
                  This application currently offers no anonymous access.
                  Please login or create a new account.
                </p>
              </div>
            );
          }} />
          <Route path="/login" component={UserLogin} />
          <Route path="/logout" component={UserLogout} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, addUser }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    PGUser: mall.PGUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);