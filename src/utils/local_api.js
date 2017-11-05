const fetchAllFeedback = () => {
  return fetch(`http://localhost:3100/api/v1/feedback`)
    .then(results => results.json())
    .then(feedback => {
      return cleanMovieData(movies.results)
    })
}