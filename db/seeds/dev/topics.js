
// Seed Data - Topics

let topicData = [
  {
    parent: 'Programming Languages',
    name: 'CSS'
  },
  {
    parent: 'Programming Languages',
    name: 'HTML'
  },
  {
    parent: 'Programming Languages',
    name: 'JavaScript'
  },
  {
    parent: 'Programming Languages',
    name: 'C#.NET'
  },
  {
    parent: 'Programming Languages',
    name: 'VB.NET'
  },
  {
    parent: 'Programming Languages',
    name: 'Ruby'
  },
  {
    parent: 'Programming Languages',
    name: 'Python'
  },
  {
    parent: 'Programming Languages',
    name: 'Java'
  },
  {
    parent: 'Programming Languages',
    name: 'PHP'
  },
  {
    parent: 'Programming Languages',
    name: 'SQL'
  },
  {
    parent: 'Programming Languages',
    name: 'Rust'
  },
  {
    parent: 'Programming Languages',
    name: 'Golang'
  },
  {
    parent: 'Databases',
    name: 'MySQL'
  },
  {
    parent: 'Databases',
    name: 'MongoDB'
  },
  {
    parent: 'Databases',
    name: 'Redis'
  },
  {
    parent: 'Databases',
    name: 'PostgreSQL'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Grunt'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Gulp'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'npm'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Bower'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Docker'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'WebPack'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Require.JS'
  },
  {
    parent: 'Task Runners/Package Managers',
    name: 'Browserify'
  }  
];


const createTopic = (knex, topic) => {
  return knex('topics').insert(topic);
};

exports.seed = function (knex, Promise) {
  // delete rows first
  return knex('topics').del()
    .then(() => {
      let topicPromises = [];
      topicData.forEach(topic => {
        topicPromises.push(createTopic(knex, topic));
      });
      return Promise.all(topicPromises);
    })
    .catch(error => console.log('Error seeding TOPICS data:', error));
};