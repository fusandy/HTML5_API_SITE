const WebSocket = require('ws');
// const sessionParser = require(__dirname + '/session-parser');

const createChatServer = server=>{
	const wsServer = new WebSocket.Server({server});
	const map = new Map(); // 存放對應的名稱
    // 使用Map()最主要的目的: key可以是任何類型

	wsServer.on('connection', (ws, req)=>{
		// console.log('req.session:', req.session);
		// sessionParser(req, {}, () => {
		// 	console.log('req.session:', req.session);
		// });

		map.set(ws, {name: ''}); 
        // 設定對應的物件(key, value) => ( websocket物件當作key , 用戶的{ name: ‘   ’ }當作value )

		ws.on('message', message=>{
			const mObj = map.get(ws); // 取得ws對應的物件
			let msg;

            // (!Obj.name) ⇒ true , 代表Obj.name沒有名字
			if(! mObj.name){
                // 那初始的名字就要填入Obj
				mObj.name = message;
				msg = `${mObj.name} 進入, 人數: ${wsServer.clients.size}`;
			} else {
				msg = `${mObj.name}: ${message}`;	
			}
			wsServer.clients.forEach(c=>{
				if(c.readyState===WebSocket.OPEN){
					c.send(msg.toString());
				}
			});
		});
	});
};
module.exports = createChatServer;