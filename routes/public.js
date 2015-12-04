module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', { title: '9ostrd' });
    });
    
    app.get('/socketio', function(req, res) {
        res.render('socketio/socketio', { title: '9ostrd' });
    });
    
    // app.post('/api/rfid', function(req, res) {
    //     var rfid = JSON.parse(req.body.rfid);
    //     for(var i = 0; i <= (fakedatabase.length)-1;i++){
    //         if(fakedatabase[i].id == rfid.id){
    //             io.emit('notification', { "messages" : fakedatabase[i].name });
    //             res.json({ "status": "successfull"});
    //             return;
    //         }
    //     }
    //     res.status(404).send('404 Not found\n');
    // });

};
