import { on } from '../utils/eventBus'
import type { FriendMessage, GroupMessage, Message } from '../types/MessageType'

// bot消息事件
type Data<T = Message> = { syncId: number; data: T }
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

export const onGroupMessage = (
  data: (data: Data<GroupMessage>) => void,
  group?: number
) => {
  onMessage<Data<GroupMessage>>((message) => {
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

export const onFriendMessage = (
  data: (data: Data<FriendMessage>) => void,
  qq?: number
) => {
  onMessage<Data<FriendMessage>>((message) => {
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
