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
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {

    if (this.props.PGUser && this.props.PGUser.id) {
      console.log('DID MOUNT IN DASHBOARD:', this.props.PGUser);
      
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
    
    // const feedbackCompArray = Object.keys(this.state.feedbackArray)
    // .map(feedback => {
    //   return <Feedback key={feedback}
    //     details={this.state.feedbackArray[feedback]}
    //     feedbackId={feedback}
    //   />
    // })




    return (
      <div>
        <h2>Dashboard</h2>
        <div className='pt-card pt-elevation-0'>
          <p>
            Hello there young Padawan. Fear not, for you are on your path of becoming a Jedi Master.
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
        <div className='pt-card pt-elevation-1'>
          <h3>Schedule</h3>
          <h5>Upcomming and recent training sessions</h5>
          { scheduleList }
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Feedback</h3>
          <h5>Recent feedback sent by your Jedi Masters</h5>
          { feedbackList }
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Training</h3>
          <h5>Seek out a Jedi Master for training</h5>
          { trainingList }
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
