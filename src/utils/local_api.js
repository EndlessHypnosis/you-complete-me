
export const fetchPGUser = (uid) => {
  return fetch(`http://localhost:3100/api/v1/users/${uid}`)
    .then(results => results.json())
    .then(users => {
      console.log('WHAT IS USER A:', users[0]);

      return users[0];
    })
}

// export const fetchAllFeedback = () => {
//   return fetch(`http://localhost:3100/api/v1/feedback`)
//     .then(results => results.json())
//     .then(feedback => {
//       return cleanMovieData(movies.results)
//     })
// }