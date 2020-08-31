
const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {});

    primus.on('connection', (spark) =>{
        console.log('received spark!');

        spark.on('data', (json) => {
            // console.log(data);
            primus.write(json);
        })
    })
}





module.exports.go = go;
