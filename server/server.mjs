import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

// Create MySQL connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql',
  database: 'quiz'
});

// Connect to MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json()); // Add this line to parse JSON requests


app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

/*User*/
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, gender, email, password, role } = req.body;

    // Validate inputs
    if (!first_name || !last_name || !gender || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const query = "INSERT INTO user(first_name, last_name, gender, email, password, role) VALUES (?,?,?,?,?,?)";
    mysqlConnection.query(query, [first_name, last_name, gender, email, hashedPassword, role], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error); // Log detailed error message
        return res.status(500).json({
          success: false,
          message: "Error inserting data"
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Data inserted"
        });
      }
    });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({
      success: false,
      message: "Error registering user"
    });
  }
});
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * from user WHERE email = ?";

    mysqlConnection.query(query, [email], async (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length > 0) {
        const user = results[0];
        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // If passwords match, return the user object
          delete user.password;
          res.status(200).json({
            success: true,
            message: "Login successful",
            user: user
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Invalid email or password"
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//Home
app.get('/result/:userId', (req, res) => {
  const userId = req.params.userId;
  // Query to fetch quizzes for a specific user
  const query = `SELECT * FROM Quiz WHERE (user_id, title_id, id) IN 
  (SELECT user_id, title_id, MAX(id) AS max_id 
   FROM Quiz 
   WHERE user_id = ? 
   GROUP BY user_id, title_id)`;

  // Execute the query with the user ID as a parameter
  mysqlConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json(results); // Send the fetched data as JSON response
    }
  });
});


// create quiz
// app.post("/user/create-quiz/:id", (req, res) => {
//   try {
//     const _id = req.params.id;
//     const { title_id, title, no_of_question } = req.body;
//     const sql =
//       "INSERT INTO QUIZ(user_id,title_id,title,no_of_question) VALUES(?,?,?,?)";
//     mysqlConnection.query(
//       sql,
//       [_id, title_id, title, no_of_question],
//       (err, data) => {
//         if (err) throw err;
//         res.status(200).json({
//           message: "quiz data inserted",
//           success: true,
//         });
//       }
//     );
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
// app.post("/quiz/create-quiz", (req, res) => {
//   try {
//     const { user_id, title_id, title, no_of_question } = req.body;

//     // Fetch random questions based on title_id
//     const sql = `
//       SELECT qq.id AS question_id, qq.question, qq.answer_id, qq.answer_text, qq.explanation, qq.difficulty, qq.marks,
//              qo.option_id, qo.option_text
//       FROM quiz_question qq
//       INNER JOIN quiz_question_option qo ON qq.id = qo.question_id
//       WHERE qq.title_id = ? 
//       ORDER BY RAND()
//       LIMIT ?
//     `;
//     mysqlConnection.query(sql, [title_id, no_of_question], (err, results) => {
//       if (err) {
//         console.error('Error fetching random questions:', err);
//         return res.status(500).json({ success: false, message: 'Failed to fetch random questions' });
//       }

//       // Construct the JSON object containing questions and options
//       const quizQuestions = results.map(row => ({
//         question_id: row.question_id,
//         question: row.question,
//         answer_id: row.answer_id,
//         answer_text: row.answer_text,
//         explanation: row.explanation,
//         difficulty: row.difficulty,
//         marks: row.marks,
//         options: results.filter(option => option.question_id === row.question_id)
//                          .map(option => ({ option_id: option.option_id, option_text: option.option_text }))
//       }));

//       // Insert the quiz data into the Quiz table
//       const insertQuizSql = "INSERT INTO Quiz (user_id, title_id, title, no_of_question) VALUES (?, ?, ?, ?)";
//       mysqlConnection.query(insertQuizSql, [user_id, title_id, title, no_of_question], (err, result) => {
//         if (err) {
//           console.error('Error inserting quiz data:', err);
//           return res.status(500).json({ success: false, message: 'Failed to insert quiz data' });
//         }
//         const quizId = result.insertId;
//         return res.status(200).json({ success: true, message: 'Quiz data inserted successfully', quizId, quizQuestions });
//       });
//     });
//   } catch (error) {
//     console.error('Error adding quiz:', error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });
app.post("/quiz/create-quiz", (req, res) => {
  try {
    const { user_id, title_id, title, no_of_question } = req.body;

    // Insert the quiz data into the Quiz table
    const insertQuizSql = "INSERT INTO Quiz (user_id, title_id, title, no_of_question) VALUES (?, ?, ?, ?)";
    mysqlConnection.query(insertQuizSql, [user_id, title_id, title, no_of_question], (err, result) => {
      if (err) {
        console.error('Error inserting quiz data:', err);
        return res.status(500).json({ success: false, message: 'Failed to insert quiz data' });
      }
      const quizId = result.insertId;

      return res.status(200).json({ success: true, message: 'Quiz data inserted successfully', quizId });
    });
  } catch (error) {
    console.error('Error adding quiz:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.get("/quiz/questions/:quizId", (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { difficulty, amount } = req.query;

    // Parse amount as an integer
    const parsedAmount = parseInt(amount, 10);

    // Fetch questions based on the quiz ID, category, difficulty, and amount
    const sql = `
    SELECT qq.id AS question_id, qq.question, qq.answer_id, qq.answer_text, qq.explanation, qq.difficulty, qq.marks,
        qo.option_id, qo.option_text
    FROM (
    SELECT qq.id, qq.question, qq.answer_id, qq.answer_text, qq.explanation, qq.difficulty, qq.marks
    FROM quiz_question qq
    JOIN Quiz q ON qq.title_id = q.title_id -- Join with quiz table to get title_id
    WHERE q.id = ? AND qq.difficulty = ? -- Use quiz id instead of title_id
    ORDER BY RAND() -- Randomize the order of questions
    LIMIT ?
    ) AS qq
    JOIN quiz_question_option qo ON qq.id = qo.question_id
    ORDER BY qq.id, qo.option_id;
    `;
    
    mysqlConnection.query(sql, [quizId, difficulty, parsedAmount], (err, results) => {
      if (err) {
        console.error('Error fetching quiz questions:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch quiz questions' });
      }

      // Construct the JSON object containing questions and options
      const quizQuestionsData = [];

      // Group results by question_id
      const questionGroups = {};
      results.forEach(row => {
        if (!questionGroups[row.question_id]) {
          questionGroups[row.question_id] = {
            question_id: row.question_id,
            question: row.question,
            answer_id: row.answer_id,
            answer_text: row.answer_text,
            explanation: row.explanation,
            difficulty: row.difficulty,
            marks: row.marks,
            options: []
          };
        }
        questionGroups[row.question_id].options.push({ option_id: row.option_id, option_text: row.option_text });
      });

      // Convert questionGroups object to array
      for (const questionId in questionGroups) {
        quizQuestionsData.push(questionGroups[questionId]);
      }

      const responseData = {
        success: true,
        message: "Quiz questions fetched successfully",
        quizId: quizId,
        quizQuestions: quizQuestionsData
      };

      return res.status(200).json(responseData);
    });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.post("/quiz/update-result/:quizId", (req, res) => {
  try {
    const quizId = req.params.quizId;
    const {totalTime, totalScore } = req.body;

    // Update the quiz data in the Quiz table
    const updateQuizSql = "UPDATE Quiz SET total_marks = ?, time = ? WHERE id = ?";
    mysqlConnection.query(updateQuizSql, [totalScore, totalTime, quizId], (err, result) => {
      if (err) {
        console.error('Error updating quiz data:', err);
        return res.status(500).json({ success: false, message: 'Failed to update quiz data' });
      }

      return res.status(200).json({ success: true, message: 'Quiz data updated successfully' });
    });
  } catch (error) {
    console.error('Error updating quiz:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

//Admin
app.get("/admin/get-users", (req, res) => {
  try {
    // Query to fetch all users
    const query = "SELECT * FROM user";

    // Execute the query
    mysqlConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({
          success: false,
          message: "Error fetching users"
        });
      }

      // Send the results back as JSON
      res.status(200).json({
        success: true,
        users: results
      });
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({
      success: false,
      message: "Error fetching users"
    });
  }
});
app.post("/admin/set-question", (req, res) => {
  try {
    const {
      title_id,
      question,
      answer_id,
      answer_text,
      explanation,
      difficulty,
      marks,
    } = req.body;
    const body = req.body;
    let ind = 'a';
    const keysStartingWithOp = {}; // {"op1":1, "op2":2, "op3":3}    
    for (const key in body) {
      if (key.startsWith("op")) {
        keysStartingWithOp[key] = body[key];
      }
    }
    const optionKeys = Object.keys(keysStartingWithOp);


    const same_question = "SELECT * FROM quiz_question WHERE question=?";
    mysqlConnection.query(same_question, [question], (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        return res.status(400).json({
          message: "quiz question already exists",
          success: true,
        });
      }
      const sql =
        "INSERT INTO quiz_question(title_id,question,answer_id,answer_text,explanation,difficulty,marks) VALUES(?,?,?,?,?,?,?)";


      mysqlConnection.query(
        sql,
        [
          title_id,
          question,
          answer_id,
          answer_text,
          explanation,
          difficulty,
          marks,
        ],
        (err, data) => {
          if (err) throw err;
         
          const questionId = data.insertId;   // it returns the autoincremented id of that data
         
          optionKeys.forEach((key) => {
            const optionText = keysStartingWithOp[key];
            const insertOptionSql =
              "INSERT INTO quiz_question_option(question_id, option_id, option_text) VALUES (?, ?, ?)";
            mysqlConnection.query(
              insertOptionSql,
              [questionId, ind, optionText],
              (err) => {
                if (err) throw err;
              });
              ind = String.fromCharCode(ind.charCodeAt(0) + 1);
          });
          res.status(200).json({
            success: true,
            message: "All data and options are inserted",
          });
        });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
app.get('/admin/get-question-answer', (req, res) => {
  try {
    // SQL query to fetch all questions
    const query = 'SELECT * FROM quiz_question';

    // Execute the SQL query
    mysqlConnection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching questions:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching questions',
        });
      }

      // Send the fetched questions back as JSON response
      res.status(200).json({
        success: true,
        questions: results,
      });
    });
  } catch (err) {
    console.error('Error fetching questions:', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching questions',
    });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
