import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchFeedback } from '../actions/index';

class Feedback extends Component {
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

    return (
      <div>
        Feedback ID: {this.props.feedback.id}
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
    currentUser: mall.currentUser,
    feedbackb: mall.feedback
  };
}

export default connect(mapStateToProps, null)(Feedback);
