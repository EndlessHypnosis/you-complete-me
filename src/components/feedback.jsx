import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
const moment = require('moment');

class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dateReceived = moment(this.props.feedback.updated_at).format('MMMM Do YYYY, hh:mm');
    return (
      <div className='pt-callout feedback-card'>
        <p><strong>Date: </strong>{dateReceived}</p>
        <p><strong>Feedback: </strong>{this.props.feedback.message}</p>
      </div>
    );
  }
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser
  };
}

export default connect(mapStateToProps, null)(Feedback);