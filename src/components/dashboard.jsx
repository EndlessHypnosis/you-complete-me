import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeFeedback, storeTraining } from '../actions/index';
import { getFeedback, getTraining } from '../utils/local_api';
import Schedule from './schedule';
import Feedback from './feedback';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.PGUser && this.props.PGUser.id) {
      getFeedback(this.props.PGUser.id)
        .then(feedback => {
          this.props.storeFeedback(feedback);
        })

      getTraining(this.props.PGUser.id)
        .then(training => {
          this.props.storeTraining(training);
        })
    }

  }

  render() {

    const scheduleList = this.props.training.map(training =>
      <Schedule key={`pt-schedule-${training.id}`} training={training} />
    )

    const feedbackList = this.props.feedback.map(feedback =>
      <Feedback key={`pt-feedback-${feedback.id}`} feedback={feedback} />
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
          <h5>Upcomming scheduled training sessions</h5>
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Feedback</h3>
          <h5>Recent feedback sent by your Jedi Masters</h5>
          { feedbackList }
        </div>
        <div className='pt-card pt-elevation-1'>
          <h3>Training</h3>
          <h5>Seek out a Jedi Master for training</h5>
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    storeFeedback,
    storeTraining
  }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    PGUser: mall.PGUser,
    feedback: mall.feedback,
    training: mall.training
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
