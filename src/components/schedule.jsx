import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
const moment = require('moment');

// import { bindActionCreators } from 'redux';
// import { fetchFeedback } from '../actions/index';

class Schedule extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.state = {
    //   message: '',
    //   feedbackArray: []
    // };
  }

  // componentDidMount() {
  //   this.props.fetchFeedback()
  //     .then(results => results.payload.json())
  //     .then(feedback => {
  //       console.log('FEEDBACK:', feedback);
  //       this.setState({
  //         feedbackArray: feedback
  //       })
  //     })
  // }

  render() {

    let goodDate = moment(this.props.schedule.scheduled_for_date).format('MMMM Do YYYY, hh:mm');;
    
    return (
      <div className='pt-callout pt-intent-primary schedule-card'>
        <p><strong>Schedule For:</strong> {goodDate}</p>
        <p><strong>Duration:</strong> {this.props.schedule.length_in_minutes} mins</p>
        <p><strong>Status:</strong> {this.props.schedule.status}</p>
        <p><strong>Location:</strong> {this.props.schedule.location}</p>
      </div>
    );
  }

}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchFeedback
//   }, dispatch);
// }

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser
  };
}

export default connect(mapStateToProps, null)(Schedule);
