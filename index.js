const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const members = require('./member');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'member app',
        members
    });
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use('/api/members', require('./routers/api/members'));

app.get('/api/members', (req, res) => {
    res.json(members);
});

app.listen(5000, () => {
    console.log(`App listening on port ${PORT}!`);
});