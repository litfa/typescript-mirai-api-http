import type { MessageChain } from '../types/MessageChainType'
import { emit } from '../utils/eventBus'
import { SendMessageOption } from '../types/Common'

const send = (json: object) => {
  emit('send', json)
}

const sendGroupMessage = (
  groupId: number,
  messageChain: MessageChain[],
  options?: SendMessageOption
) => {
  const { syncId = 0, quote, ...option } = options
  send({
    syncId,
    quote,
    command: 'sendGroupMessage',
    content: {
      group: groupId,
      messageChain
    },
    ...option
  })
}

const sendFriendMessage = (
  target: number,
  messageChain: MessageChain[],
  options?: SendMessageOption
) => {
  const { syncId = 0, quote, ...option } = options
  send({
    syncId,
    command: 'sendFriendMessage',
    content: {
      target,
      messageChain
    },
    ...option
  })
}

export { sendGroupMessage, sendFriendMessage, send }
