
const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {});

    primus.on('connection', (spark) =>{
        console.log('received spark!');

        spark.on('data', (jsonData) => {
            // console.log(data);
            primus.write(jsonData);
        })
    })
}





module.exports.go = go;
