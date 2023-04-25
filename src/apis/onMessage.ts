import { on } from '../utils/eventBus'
import type { Message } from '../types/MessageType'

// bot消息事件
type Data = { syncId: number; data: Message }
type Callback<T> = (data: T) => void

export const onMessage = <T = Data>(callback: Callback<T>) => {
  on('message', (message) => {
    try {
      callback(JSON.parse(message.data))
    } catch (e) {
      console.log('接收到非json格式数据', message, e)
    }
  })
}

export const onGroupMessage = (data: (data: Data) => void, group?: number) => {
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

export const onFriendMessage = (data: (data: Data) => void, qq?: number) => {
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
