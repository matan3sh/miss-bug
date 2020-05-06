const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// App Init
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  session({
    secret: 'MK5ghTFGjkpw679837Bn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Routes
app.use('/api', require('./routes/user'));
app.use('/api/bug', require('./routes/bug'));

// Define Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
