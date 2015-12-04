module.exports = function(app, loggedIn) {

        app.get('/pp', function(req, res) {
        res.render('pop/pp', { title: 'Poprapas' });
    });
};
