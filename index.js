const express = require('express')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

require('./config/database')
const userRouter = require('./routes/auth');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const challengeRouter = require('./routes/challenge'); 
const quizRouter = require('./routes/quiz');
const reportRouter=require('./routes/reports');
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/student',studentRouter)
app.use('/api/v1/challenge',challengeRouter)      
app.use('/api/v1/teacher',teacherRouter)
app.use('/api/v1/quiz',quizRouter)      
app.use('/api/v1/reports',reportRouter)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
});

