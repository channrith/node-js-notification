const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    app.get('/', (req, res) => {



        var sendNotification = function(data) {
            var headers = {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "Basic YmU4YzMzMDUtNjA3ZC00M2FhLWFiN2MtZWI0NTNlN2RhM2U1"
            };
            
            var options = {
              host: "onesignal.com",
              port: 443,
              path: "/api/v1/notifications",
              method: "POST",
              headers: headers
            };
            
            var https = require('https');
            var req = https.request(options, function(res) {  
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
          
          var message = { 
            app_id: "511bcbbb-ad80-438b-bd5c-2fbf2c0f4efc",
            contents: {"en": "English Message"},
            included_segments: ["All"]
          };
          
          console.log(sendNotification(message));




        res.send('Hello world!');
    });
});

console.log(`server is running on port ${port}`);
