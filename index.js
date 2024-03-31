// now start backend
// now create the own server
const http = require("http");
const fs = require("fs");
// this is npm module so  i installed request module
var requests = require('requests');
const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal=(temproryVal,orgVal)=>{
    let temperature=temproryVal.replace("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replace(" {%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replace(" {%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
     temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
   return temperature;
}

// maine khud html file backend me load kar liya
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Begusarai&appid=105d73d2ae361acbfc1ef28e20d9e61a")
            .on('data', function (chunk) {
                const objdata=JSON.parse(chunk);
                const arrdata=[objdata];
                // console.log(arrdata[0].main.temp);
                const realTimedata=arrdata.map(val=>replaceVal(homeFile ,val)).join("");
                res.write(realTimedata);
                // console.log(realTimedata);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});
server.listen(8000,"127.0.0.1",()=>{
    console.log("connection successfully");
});

