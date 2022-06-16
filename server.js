
//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(cors({origin: 'http://194.163.34.47:5000'}));

// Serve only the static files form the dist directory
app.use(express.static('./www'));


app.get('/*', function(req,res) {
res.sendFile(path.join('./www/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
