# mirai-api-http ts支持

## 安装
``` shell
npm install typescript-mirai-api-http
```
使用yarn
``` shell
yarn add typescript-mirai-api-http
```

## 使用
``` js
import { CreateMiraiApi } from 'typescript-mirai-api-http'

// 通过 CreateMiraiApi 获得 Mirai 对象
const Mirai = CreateMiraiApi(
  'localhost',
  3000,
  '12345',
  1585380249
)
```

## Mirai 对象
### 接收消息
#### onMessage
接收所有消息
``` js
onMessage((message) => {
  console.log(message)
})
```

#### onGroupMessage
接收所有群消息
``` js
onGroupMessage((message) => {
  console.log(message)
})
```
接收单个群消息  
在第二个参数传入群号
``` js
onGroupMessage((message) => {
  console.log(message)
}, 123456)
```

#### onFriendMessage
接收所有好友消息
``` js
onFriendMessage((message) => {
  console.log(message)
})
```
接收单个好友消息  
在第二个参数传入qq号
``` js
onFriendMessage((message) => {
  console.log(message)
}, 123456)
```

### 发送消息
#### sendGroupMessage
发送群聊消息

### sendFriendMessage
发送好友消息

### send
发送 mirai json 格式消息，使用该方法会自动使用 JSON.stringify 转换为字符串，因此传入json即可

### 其他
若以上方法无法满足需求，还可使用原生 ws
``` js
// ...省略初始化
const { ws } = Mirai;
ws.send(JSON.stringify({
  // 内容
}))
```
