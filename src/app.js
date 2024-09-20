const express = require('express');
const cors = require('cors');
const servicesRouter = require('./routes/services.router');
const usersRouter = require('./routes/user.router');
const typeRouter = require('./routes/type.router');
const session = require('express-session');

const app = express();

const {
    resourceNotFound,
    handleError
} = require('./controllers/errors.controller');

const { SESSION_SECRET } = process.env;
const multer = require('multer');
const { swaggerUi, specs } = require('./docs/swagger');
const swaggerJSDoc = require('swagger-jsdoc');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, 'public/images')
  },
  filename: function(req, file, cb) {
    return cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Add this middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our page.' });
});

// apply sesstion to app
app.use(session({secret: SESSION_SECRET, resave: true, saveUninitialized: true}));

// apply service router
app.use('/api/services', servicesRouter);

// apply user router
app.use('/api/user', usersRouter);

//apply type router
app.use('/api/type', typeRouter);
// uploaf
app.use('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file)
});

app.use('/api-docs', swaggerUi.serve, swaggerJSDoc.setup(specs));

// Handle 404 response 
app.use(resourceNotFound);
// Define error-handling middleware last 
app.use(handleError);

module.exports = app;