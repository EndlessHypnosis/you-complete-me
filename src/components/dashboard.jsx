import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeFeedback, storeSchedules, storeTraining } from '../actions/index';
import { getFeedback, getSchedules, getAllTraining } from '../utils/local_api';
import Schedule from './schedule';
import Training from './training';
import Feedback from './feedback';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    if (this.props.PGUser && this.props.PGUser.id) {
      getFeedback(this.props.PGUser.id)
        .then(feedback => {
          this.props.storeFeedback(feedback);
        })
      getSchedules(this.props.PGUser.id)
        .then(schedules => {
          this.props.storeSchedules(schedules);
        })
      getAllTraining()
        .then(training => {
          this.props.storeTraining(training);
        })
    }
  }

  render() {
    const scheduleList = this.props.schedule.map(schedule =>
      <Schedule key={`pt-schedule-${schedule.id}`} schedule={schedule} />
    )
    const feedbackList = this.props.feedback.map(feedback =>
      <Feedback key={`pt-feedback-${feedback.id}`} feedback={feedback} />
    )
    const trainingList = this.props.training.map(training =>
      <Training key={`pt-training-${training.id}`} training={training} />
    )
    
    return (
      <div>
        <h2>Dashboard</h2>
        {this.props.PGUser.skill_level === 'Jedi Master'
          ? 
            <div>
              <div className='pt-callout pt-create-booking-callout'>
                <h5>
                  Click
                  <button onClick={() => {
                    this.props.history.push('/booking');
                  }} className='pt-button pt-small pt-intent-primary'>here</button>
                  to create an training session with a Padawan or fellow Jedi Master
                </h5>
              </div>
              <div className='pt-card pt-elevation-0'>
                <h4>Hello Master Jedi</h4>
                <p>
                  We're excited to welcome you to the group of teachers/educators/mentors for our young Padawans.
                </p>
                <p>
                  But fear not, we know you still have more to learn yourself. Therefore, you are able to continue scheduling training for yourself,
                  which will be with fellow Jedi Masters. (If you'd like to receive training from a Padawan, encourage them to Graduate!)
                </p>
              </div>
            </div>
          : <div className='pt-card pt-elevation-0'>
            <h4>Hello Padawan</h4>
              <p>
                We're excited to help you on your path of becoming a Jedi Master.
                As a Padawan, you will be matched only with Jedi Masters for your training.
              </p>
              <p className='pt-intro-secondary'>
                Once you are ready to help train others, you can graduate to become a Jedi Master!
                Head over to your
                <button className='pt-button pt-small pt-intent-primary' onClick={() => {
                  this.props.history.push('/profile');
                }}>profile</button>
                to start the graduation process!
              </p>
            </div>
        }
        <div className='pt-card pt-elevation-1'>
          <h3>Schedule</h3>
          <h5>Upcomming and recent training sessions</h5>
          <div className='schedule-wrapper'>
            { scheduleList }
          </div>
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Feedback</h3>
          <h5>Recent feedback sent by your Jedi Masters</h5>
          <div className='schedule-wrapper variant-feedback'>
            { feedbackList }
          </div>
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Training</h3>
          <h5>Seek out a Jedi Master for training</h5>
          <div className='schedule-wrapper variant-training'>
            { trainingList }
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    storeFeedback,
    storeSchedules,
    storeTraining
  }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    PGUser: mall.PGUser,
    feedback: mall.feedback,
    schedule: mall.schedule,
    training: mall.training
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);