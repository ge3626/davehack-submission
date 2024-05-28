const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const { pool }= require('./config');
require('dotenv').config();

const userRoutes = require('./routes/user-routes');
const threadRoutes = require('./routes/thread-routes');
const likeRoutes = require('./routes/like-routes');
const commentRoutes = require('./routes/comment-routes');
const followsRoutes = require('./routes/follows-routes');
const quizsRoutes = require('./routes/quiz-routes');

const app = express();
const PORT = 3000;

app.set("trust proxy", true);
app.use(cors({
    origin: ['http://localhost:5173', 'https://davehack.vercel.app'],
    methods: ['GET','POST','PATCH','DELETE'],
    allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept, Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session_test'
    }),
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, //expires after 30 days
        secure: false
    }
}));

//routes
app.use('/user', userRoutes);
app.use('/thread', threadRoutes);
app.use('/like', likeRoutes);
app.use('/comment', commentRoutes);
app.use('/follows', followsRoutes);
app.use('/quizs', quizsRoutes);

//get user from session
app.get('/session', (req, res) => {
    if(req.session.user) {
        res.status(200).json({valid: true, user: req.session.user});
    } else {
        res.status(404).json({valid: false});
    }
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});