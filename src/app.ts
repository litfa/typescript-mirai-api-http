import WebSocket from 'ws'
import type { MessageChain } from './types/MessageChainType'
import type { Message } from './types/MessageType'
import type * as MessageChainType from './types/MessageChainType'
import type * as MessageType from './types/MessageChainType'
import { EventBus } from './utils/eventBus'

const CreateMiraiApi = (
  host: string,
  port: number,
  verifyKey: string,
  qq: number,
  retryInterval: number | false = 5000
) => {
  const { emit, on } = EventBus()
  type Data = { syncId: number; data: Message }
  let ws: WebSocket
  // 连接 ws
  const connect = () => {
    ws = new WebSocket(`ws://${host}:${port}/all?verifyKey=${verifyKey}&qq=${qq}`)
    ws.addEventListener('close', (data) => {
      emit('close', data)
      retry()
    })
    ws.addEventListener('error', (data) => {
      emit('error', data)
      retry()
    })
    ws.addEventListener('message', (data) => {
      emit('message', data)
    })
    ws.addEventListener('open', (data) => {
      emit('open', data)
    })
  }
  connect()

  // 重连
  const retry = () => {
    if (retryInterval === -1 || retryInterval === false) {
      return
    }
    // 重连之前 清除所有监听
    ws?.removeAllListeners()
    setTimeout(() => {
      connect()
    }, retryInterval)
  }

  const send = (json: object) => {
    if (typeof json == 'object') {
      return ws.send(JSON.stringify(json))
    } else {
      const any: never = json
    }
  }

  const sendGroupMessage = (
    groupId: number,
    messageChain: MessageChain[],
    syncId = 0
  ) => {
    send({
      syncId,
      command: 'sendGroupMessage',
      content: {
        group: groupId,
        messageChain
      }
    })
  }

  const sendFriendMessage = (
    target: number,
    messageChain: MessageChain[],
    syncId = 0
  ) => {
    send({
      syncId,
      command: 'sendFriendMessage',
      content: {
        target,
        messageChain
      }
    })
  }

  type Callback<T> = (data: T) => void

  // ws事件
  const close = (callback: Callback<WebSocket.CloseEvent>) => {
    on('close', (data) => {
      callback(data)
    })
  }
  const error = (callback: Callback<WebSocket.ErrorEvent>) => {
    on('error', (data) => {
      callback(data)
    })
  }
  const message = (callback: Callback<WebSocket.MessageEvent>) => {
    on('message', (data) => {
      callback(data)
    })
  }
  const open = (callback: Callback<WebSocket.Event>) => {
    on('open', (data) => {
      callback(data)
    })
  }

  // bot消息事件
  const onMessage = (callback: Callback<Data>) => {
    on('message', (message) => {
      try {
        callback(JSON.parse(message.data))
      } catch (e) {
        console.log('接收到非json格式数据', message, e)
      }
    })
  }

  const onGroupMessage = (data: (data: Data) => void, group?: number) => {
    onMessage((message) => {
      if (message.data.type == 'GroupMessage') {
        if (group) {
          if (group == message.data.sender.group.id) {
            data(message)
          }
        } else {
          data(message)
        }
      }
    })
  }

  const onFriendMessage = (data: (data: Data) => void, qq?: number) => {
    onMessage((message) => {
      if (message.data.type == 'FriendMessage') {
        if (qq) {
          if (message.data.sender.id == qq) {
            data(message)
          }
        } else {
          data(message)
        }
      }
    })
  }

  return {
    ws,
    send,
    sendGroupMessage,
    sendFriendMessage,
    close,
    error,
    message,
    open,
    onMessage,
    onGroupMessage,
    onFriendMessage
  }
}

export { CreateMiraiApi }
export type { MessageChainType, MessageType }
