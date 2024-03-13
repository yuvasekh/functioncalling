const expres=require('express')
const app=expres()
app.use(expres.json())
const apirouter=require('./routes/router')
const cors=require('cors')
app.use("/api", apirouter);
app.use(cors())
port=8001
var server = app.listen(port, function () {
    var host = server.address().address;
  
    var port = server.address().port;
  
    console.log(" app listening at http://%s:%s", host, port);
  });
  