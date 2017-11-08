import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
const moment = require('moment');

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let goodDate = moment(this.props.schedule.scheduled_for_date).format('MMMM Do YYYY, hh:mm');
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

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser
  };
}

export default connect(mapStateToProps, null)(Schedule);
