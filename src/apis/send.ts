import type { MessageChain } from '../types/MessageChainType'
import { emit } from '../utils/eventBus'

const send = (json: object) => {
  emit('send', json)
}

const sendGroupMessage = (groupId: number, messageChain: MessageChain[], syncId = 0) => {
  send({
    syncId,
    command: 'sendGroupMessage',
    content: {
      group: groupId,
      messageChain
    }
  })
}

const sendFriendMessage = (target: number, messageChain: MessageChain[], syncId = 0) => {
  send({
    syncId,
    command: 'sendFriendMessage',
    content: {
      target,
      messageChain
    }
  })
}

export { sendGroupMessage, sendFriendMessage, send }
