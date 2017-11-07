import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchFeedback } from '../actions/index';
import { DatePicker } from "@blueprintjs/datetime";
import { saveBooking } from '../utils/local_api';


class Booking extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      lengthInput: ''
    };
  }


  onFormCreateBookingSubmit(event) {
    event.preventDefault();



    saveBooking();

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


    // <div className="pt-form-group pt-callout pt-intent-primary">
    //   <label className="pt-label" htmlFor="pt-grade-input">
    //     Grade/Mod or Dev Level
    //                     <span className="pt-text-muted">( if in school, what grade, else junior/mid/senior )</span>
    //   </label>
    //   <div className="pt-form-content">
    //     <input
    //       id="pt-grade-input"
    //       onChange={(e) => { this.setState({ grade: e.target.value }); }}
    //       name="ptgradeinput"
    //       className="pt-input"
    //       style={{ width: '200px' }}
    //       placeholder="Experience Level"
    //       type="text"
    //       value={this.state.grade} />
    //     <div className="pt-form-helper-text">This can be adjusted in your profile anytime!</div>
    //   </div>
    // </div>

    //   <div className="pt-form-group pt-callout">
    //     <h5>
    //       Start your Training as a Padawan or advance to Jedi Master?
    //                   </h5>
    //     <p>
    //       This choice will determine if you will start your training as a Jedi Master (teacher/mentor)
    //                     or as a Padawan (student/apprentice). If you are un-sure of what to choose, think about your skill
    //                     level with things like HTML, JavaScript, CSS, MVC Frameworks.
    //                     If you feel fairly comfortable with one or more of these areas,
    //                     you're welcome to join the Jedi Masters group.

    //                     If you're here to train on these (and many other) areas, we recommend starting as a Padawan. Don't worry,
    //                     you can easily graduate to become a Jedi Master later on :)
    //                   </p>
    //     <label className='pt-control pt-radio pt-large'>
    //       <input
    //         type='radio'
    //         name='radio-start-skill-level'
    //         value='Padawan'
    //         onChange={this.onSkillLevelChange} />
    //       <span className='pt-control-indicator'></span>
    //       Start My Training at Padawan Level
    //                   </label>
    //     <label className='pt-control pt-radio pt-large'>
    //       <input
    //         type='radio'
    //         name='radio-start-skill-level'
    //         value='Jedi Master'
    //         onChange={this.onSkillLevelChange} />
    //       <span className='pt-control-indicator'></span>
    //       Advance to Jedi Master Level
    //                   </label>
    //   </div>


    return (
      <div>
        <h2>Create New Booking</h2>
        <p>We're so pleased to see you offering your services to our young Padawans or to your fellow Jedi Masters</p>
        <p>You can use the form below to create an open training session</p>


        <div className='pt-card pt-elevation-1'>
        
        
          <form id="formCreateBooking" role="form" onSubmit={this.onFormCreateBookingSubmit}>
          
            <div className="pt-form-group pt-callout">
              <label className="pt-label" htmlFor="jm-date-input">
                Date of Training
              </label>
              <div className="pt-form-content">
                <DatePicker/>
              </div>
            </div>

            <div className="pt-form-group pt-callout">
              <label className="pt-label">
                Time of Training
                        <span className="pt-text-muted">( in 24 hour format )</span>
              </label>
              <div className="pt-form-content">
                <input
                  id="jm-time-hour-input"
                  onChange={(e) => { this.setState({ timeHourInput: e.target.value }); }}
                  name="jmtimehourinput"
                  className="pt-input pt-input-time-hour"
                  style={{ width: '50px' }}
                  placeholder="hour"
                  type="text"
                  value={this.state.timeHourInput} />
                <input
                  id="jm-time-minutes-input"
                  onChange={(e) => { this.setState({ timeMinutesInput: e.target.value }); }}
                  name="jmtimeminutesinput"
                  className="pt-input"
                  style={{ width: '50px' }}
                  placeholder="mins"
                  type="text"
                  value={this.state.timeMinutesInput} />
              </div>
            </div>

            <div className="pt-form-group pt-callout">
              <label className="pt-label" htmlFor="jm-length-input">
                Length of Training
                        <span className="pt-text-muted">( in minutes, eg: 15, 30, 60, 90 )</span>
              </label>
              <div className="pt-form-content">
                <input
                  id="jm-length-input"
                  onChange={(e) => { this.setState({ lengthInput: e.target.value }); }}
                  name="jmlengthinput"
                  className="pt-input"
                  style={{ width: '50px' }}
                  placeholder="mins"
                  type="text"
                  value={this.state.lengthInput} />
              </div>
            </div>


            <button
              className="pt-button pt-intent-primary"
              type="submit">Save New Booking</button>
          </form>
        
        
        </div>



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

export default connect(mapStateToProps, null)(Booking);
