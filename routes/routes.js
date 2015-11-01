module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', { title: '9ostrd' });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    });

};
