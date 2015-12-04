module.exports = function(app, loggedIn) {

    app.get('/user', loggedIn,  function(req, res) {
        res.render('user/profile', { title: '9ostrd' });
    });
    
};
