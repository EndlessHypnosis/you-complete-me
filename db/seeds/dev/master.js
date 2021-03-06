const masterData = [
  {
    mentor: {
      firebase_uid: 'A3g4bbXDgwggGwcsvwDF7S6XkJG2',
      email: 'jedi1@jedi1.com',
      slack_id: 'jedi1',
      grade: 'Mod 4',
      skill_level: 'Jedi Master',
      training_as_padawan_with_jedi_attempted: '0',
      training_as_padawan_with_jedi_success: '0',
      training_as_jedi_with_jedi_attempted: '0',
      training_as_jedi_with_jedi_success: '0',
      training_as_jedi_with_padawan_attempted: '3',
      training_as_jedi_with_padawan_success: '1',
    },

    apprentice: {
      firebase_uid: 'nXcCfHuZUacfx3ewzSdkDtipMzs1',
      email: 'padawan1@padawan1.com',
      slack_id: 'padawan1',
      grade: 'Mod 1',
      skill_level: 'Padawan',
      training_as_padawan_with_jedi_attempted: '2',
      training_as_padawan_with_jedi_success: '1',
      training_as_jedi_with_jedi_attempted: '0',
      training_as_jedi_with_jedi_success: '0',
      training_as_jedi_with_padawan_attempted: '0',
      training_as_jedi_with_padawan_success: '0',
    },

    training: [
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '120',
        location: 'meet outside of mod 1 classroom',
        topics: ['CSS', 'HTML'],
        status: 'success',
      },
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '30',
        location: 'meet in study room 1',
        topics: ['CSS', 'HTML', 'JavaScript'],
        status: 'fail',
      },
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '60',
        location: 'slack me',
        topics: ['JavaScript'],
        status: 'scheduled',
      },
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '90',
        location: 'tbd',
        topics: ['JavaScript', 'HTML'],
        status: 'open',
      },
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '60',
        location: 'tbd',
        topics: ['CSS'],
        status: 'open',
      },
      {
        scheduled_for_date: '2017-11-04 19:17:40',
        length_in_minutes: '30',
        location: 'tbd',
        topics: ['JavaScript', 'CSS', 'HTML'],
        status: 'open',
      },
    ],

    feedback: [
      {
        from_user_skill_level: 'Padawan',
        to_user_skill_level: 'Jedi Master',
        message: 'first session - thanks for the help Jedi 1!',
      },
      {
        from_user_skill_level: 'Jedi Master',
        to_user_skill_level: 'Padawan',
        message: 'Hey you are you making great progres, keep it up padawan1!',
      },
    ],
  },
];
/* eslint-disable arrow-body-style */
const createDataSet = (knex, dataSet) => {
  let mentorId;
  let apprenticeId;

  // insert the mentor
  return knex('users').insert({
    firebase_uid: dataSet.mentor.firebase_uid,
    email: dataSet.mentor.email,
    slack_id: dataSet.mentor.slack_id,
    grade: dataSet.mentor.grade,
    skill_level: dataSet.mentor.skill_level,
    training_as_padawan_with_jedi_attempted: dataSet.mentor.training_as_padawan_with_jedi_attempted,
    training_as_padawan_with_jedi_success: dataSet.mentor.training_as_padawan_with_jedi_success,
    training_as_jedi_with_jedi_attempted: dataSet.mentor.training_as_jedi_with_jedi_attempted,
    training_as_jedi_with_jedi_success: dataSet.mentor.training_as_jedi_with_jedi_success,
    training_as_jedi_with_padawan_attempted: dataSet.mentor.training_as_jedi_with_padawan_attempted,
    training_as_jedi_with_padawan_success: dataSet.mentor.training_as_jedi_with_padawan_success,
  }, 'id')
    .then((userMentorId) => {
      mentorId = userMentorId[0];
      // insert the apprentice
      return knex('users').insert({
        firebase_uid: dataSet.apprentice.firebase_uid,
        email: dataSet.apprentice.email,
        slack_id: dataSet.apprentice.slack_id,
        grade: dataSet.apprentice.grade,
        skill_level: dataSet.apprentice.skill_level,
        training_as_padawan_with_jedi_attempted:
          dataSet.apprentice.training_as_padawan_with_jedi_attempted,
        training_as_padawan_with_jedi_success:
          dataSet.apprentice.training_as_padawan_with_jedi_success,
        training_as_jedi_with_jedi_attempted:
          dataSet.apprentice.training_as_jedi_with_jedi_attempted,
        training_as_jedi_with_jedi_success:
          dataSet.apprentice.training_as_jedi_with_jedi_success,
        training_as_jedi_with_padawan_attempted:
          dataSet.apprentice.training_as_jedi_with_padawan_attempted,
        training_as_jedi_with_padawan_success:
          dataSet.apprentice.training_as_jedi_with_padawan_success,
      }, 'id')
        .then((userApprenticeId) => {
          apprenticeId = userApprenticeId[0];

          const trainingPromises = [];
          let trainingPayload;

          dataSet.training.forEach((session) => {
            if (session.status === 'open') {
              // training hasn't been claimed
              // add mentor_user_id
              trainingPayload = Object.assign({}, session,
                {
                  mentor_user_id: mentorId,
                },
              );
            } else {
              // training has been claimed and has 1 of many statuses
              // add appprentice_user_id, mentor_user_id
              trainingPayload = Object.assign({}, session,
                {
                  appprentice_user_id: apprenticeId,
                  mentor_user_id: mentorId,
                },
              );
            }

            // need to stringify the array so that postreSQL
            // doesn't think it's a data type array (it's really json)
            trainingPayload.topics = JSON.stringify(trainingPayload.topics);
            /* eslint-disable no-use-before-define */
            trainingPromises.push(createTraining(knex, trainingPayload, dataSet));
            /* eslint-enable no-use-before-define */
          });
          return Promise.all(trainingPromises);
        });
    });
};

const createTraining = (knex, trainingPayload, dataSet) => {
  return knex('training').insert(trainingPayload, 'id')
    .then((trainingIds) => {
      const feedbackPromises = [];
      let feedbackPayload;

      dataSet.feedback.forEach((reply) => {
        if (reply.from_user_skill_level === 'Padawan') {
          feedbackPayload = Object.assign({}, reply,
            {
              from_user_id: trainingPayload.appprentice_user_id,
              to_user_id: trainingPayload.mentor_user_id,
              training_id: trainingIds[0],
            },
          );
        } else {
          feedbackPayload = Object.assign({}, reply,
            {
              from_user_id: trainingPayload.mentor_user_id,
              to_user_id: trainingPayload.appprentice_user_id,
              training_id: trainingIds[0],
            },
          );
        }

        if (trainingPayload.appprentice_user_id) {
          /* eslint-disable no-use-before-define */
          feedbackPromises.push(createFeedback(knex, feedbackPayload));
          /* eslint-enable no-use-before-define */
        }
      });
      return Promise.all(feedbackPromises);
    });
};

const createFeedback = (knex, feedback) => {
  return knex('feedback').insert(feedback);
};


// starts here
exports.seed = (knex, Promise) => {
  // Delete all table rows first
  return knex('feedback').del()
    .then(() => knex('training').del())
    .then(() => knex('users').del())
    // now that the data is clean, insert new data
    .then(() => {
      const masterPromises = [];
      masterData.forEach((dataSet) => {
        masterPromises.push(createDataSet(knex, dataSet));
      });
      return Promise.all(masterPromises);
    })
    .catch((error) => {
      /* eslint-disable no-console */
      return console.log('Error seeding MASTER data:', error);
      /* eslint-enable no-console */
    });
};
/* eslint-enable arrow-body-style */
