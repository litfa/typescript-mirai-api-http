import WebSocket from 'ws'
import type { MessageChain } from './types/MessageChainType'
import type { Message } from './types/MessageType'
import type * as MessageChainType from './types/MessageChainType'
import type * as MessageType from './types/MessageChainType'

type Data = { syncId: number; data: Message }

const CreateMiraiApi = (host: string, port: number, verifyKey: string, qq: number) => {
  const ws = new WebSocket(`ws://${host}:${port}/all?verifyKey=${verifyKey}&qq=${qq}`)

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

  const onMessage = (data: (data: Data) => void) => {
    ws.on('message', (e) => {
      try {
        // @ts-ignore
        const message = JSON.parse(e)
        data(message)
      } catch (e) {
        console.log(e)
      }
    })
  }

  const onGroupMessage = (group: number, data: (data: Data) => void) => {
    onMessage((message) => {
      if (message.data.type == 'GroupMessage' && message.data.sender.group.id == group) {
        data(message)
      }
    })
  }

  const onFriendMessage = (qq: number, data: (data: Data) => void) => {
    onMessage((message) => {
      if (message.data.type == 'FriendMessage' && message.data.sender.id == qq) {
        data(message)
      }
    })
  }

  return {
    ws,
    send,
    sendGroupMessage,
    sendFriendMessage,
    onMessage,
    onGroupMessage,
    onFriendMessage
  }
}

export { CreateMiraiApi }
export type { MessageChainType, MessageType }
