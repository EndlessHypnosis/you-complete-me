import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFeedback } from '../actions/index';
import Feedback from './feedback';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
      feedbackArray: []
    };
  }

  componentDidMount() {
    this.props.fetchFeedback()
    .then(results => results.payload.json())
    .then(feedback => {
      console.log('FEEDBACK:', feedback);
      this.setState({
        feedbackArray: feedback
      })
    })
  }

  render() {

    const feedbackList = this.state.feedbackArray.map(feedback =>
      <Feedback key={feedback.id} feedback={feedback} />
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
          <h5>Upcomming scheduled training sessions</h5>
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
    fetchFeedback
  }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    feedback: mall.feedback
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
