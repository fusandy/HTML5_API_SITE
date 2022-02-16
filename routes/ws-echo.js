const WebSocket = require('ws');

const createEchoServer = server => {

    const wsServer = new WebSocket.Server({server});

    wsServer.on('connection', (ws,req)=>{
        // ws: 當用戶連進來，在WebSocket Server產生的對應物件，該ws物件對應到該用戶，每個用戶的ws都是獨立的
        
        // wsServer.clients.size 內建計算連線數的方法
        console.log('wsServer.clients.size:', wsServer.clients.size);
        ws.on('message', messsage=>{
            ws.send(messsage.toString());
        })
        ws.send('已連線, 歡迎使用')
    })
};

module.exports = createEchoServer;