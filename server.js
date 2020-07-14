const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/send',function(req,res){
    let sendNotification = function(data) {
        let headers = {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Basic YmU4YzMzMDUtNjA3ZC00M2FhLWFiN2MtZWI0NTNlN2RhM2U1"
        };
        
        let options = {
          host: "onesignal.com",
          port: 443,
          path: "/api/v1/notifications",
          method: "POST",
          headers: headers
        };
        
        let https = require('https');
        let req = https.request(options, function(res) {  
          res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
          });
        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
      };
      
      let message = { 
        app_id: "511bcbbb-ad80-438b-bd5c-2fbf2c0f4efc",
        contents: {"en": "English Message"},
        included_segments: ["All"]
      };
      
      sendNotification(message);

      res.sendFile(path.join(__dirname+'/send.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');