var express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const fs = require('fs');
const { exec } = require('child_process');
const port = process.env.PORT || 8081;

app.use(express.urlencoded({extended : true}));
app.use(express.json({extended : true}));

router.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname+'/myide.html')); 
  }); 

router.post('/', function(req, res) {
    pythonfile = req.body.code;
    fs.writeFile('test.py', pythonfile, function(err, data) {
        if (err) {
            res.error(err);
            return;
        }
    });
    exec('python test.py',10000, (error, stdout, stderr) => {
        if (error) {
            res.write(stderr);
            res.write("Error in execution");
            res.send();
            return;
        }

        res.write(`stdout: ${stdout}`);
        res.send();
        return;

    });

})
app.use('/',router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))