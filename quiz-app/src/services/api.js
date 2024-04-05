//FUTURE WORK

const API_BASE_URL = "https://quiz-app-react-native.vercel.app/";

const QuizService = {
  fetchQuizzes: (user) => {
    if (user) {
      fetch(`${API_BASE_URL}/result/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch quizzes');
          }
          return response.json();
        })
        .then((data) => {
          setQuizzes(data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
};
