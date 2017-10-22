const SpeechController = require('../controllers/speechController')

module.exports = (app) => {
    // watch for incoming requests of method GET
    // to the route http://localhost:3050/api 
    // app.get('/', (req, res, next) => {
    //     res.send('hello world')
    // })
    app.post('/api/speech', SpeechController.getText);
};