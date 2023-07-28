# mirai-api-http ts 支持

## 安装

```shell
npm install typescript-mirai-api-http
```

使用 yarn

```shell
yarn add typescript-mirai-api-http
```

## 使用

```js
import { CreateMiraiApi } from 'typescript-mirai-api-http'

// 通过 CreateMiraiApi 获得 Mirai 对象
const Mirai = CreateMiraiApi('localhost', 3000, '12345', 1585380249)
```

## Mirai 对象

### 接收消息

#### onMessage

接收所有消息

```js
onMessage((message) => {
  console.log(message)
})
```

#### onGroupMessage

接收所有群消息

```js
onGroupMessage((message) => {
  console.log(message)
})
```

接收单个群消息  
在第二个参数传入群号

```js
onGroupMessage((message) => {
  console.log(message)
}, 123456)
```

#### onFriendMessage

接收所有好友消息

```js
onFriendMessage((message) => {
  console.log(message)
})
```

接收单个好友消息  
在第二个参数传入 qq 号

```js
onFriendMessage((message) => {
  console.log(message)
}, 123456)
```

### 发送消息

#### sendGroupMessage

发送群聊消息

```js
sendGroupMessage(123456, [
  {
    type: 'Plain',
    text: 'hello world'
  }
])
```
回复某条消息/设置消息的syncId  
同时 如果有其他参数，也可以在第三个参数对象中传递
```js
sendGroupMessage(
  123456,
  [
    {
      type: 'Plain',
      text: 'hello world'
    }
  ],
  {
    quote: 2861,
    syncId: 290741
  }
)
```

### sendFriendMessage

发送好友消息(使用方法与群消息一致)

### send

发送 mirai json 格式消息，使用该方法会自动使用 JSON.stringify 转换为字符串，因此传入 json 即可

### 其他

若以上方法无法满足需求，还可使用原生 ws

```js
// ...省略初始化
const { ws } = Mirai
ws.send(
  JSON.stringify({
    // 内容
  })
)
```

### 销毁实例

```js
// ...省略初始化
const { destroy } = Mirai
destroy()
```
