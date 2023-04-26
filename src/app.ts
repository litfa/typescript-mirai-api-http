import WebSocket from 'ws'
import type * as MessageChainType from './types/MessageChainType'
import type * as CommonType from './types/Common'
import type * as MessageType from './types/MessageType'
import type * as EventType from './types/EventType'
import * as ApiDataType from './types/ApiData'
import { emit, on } from './utils/eventBus'
import { close, error, message, open } from './apis/wsEvent'
import { sendFriendMessage, sendGroupMessage, send } from './apis/send'
import { onFriendMessage, onGroupMessage, onMessage } from './apis/onMessage'
import {
  getApi,
  getBotProfile,
  getFriendList,
  getFriendProfile,
  getGroupList,
  getLatestMemberList,
  getMemberList,
  getMemberProfile,
  getUserProfile
} from './apis/get'
import * as groupManagement from './apis/groupManagement'

const CreateMiraiApi = (
  host: string,
  port: number,
  verifyKey: string,
  qq: number,
  retryInterval: number | false = 5000
) => {
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

  on('send', (json) => {
    if (typeof json == 'object') {
      return ws.send(JSON.stringify(json))
    }
  })

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
    onFriendMessage,
    getApi,
    getFriendList,
    getGroupList,
    getMemberList,
    getLatestMemberList,
    getBotProfile,
    getFriendProfile,
    getMemberProfile,
    getUserProfile,
    ...groupManagement
  }
}

export { CreateMiraiApi }
export type { MessageChainType, MessageType, CommonType, ApiDataType, EventType }
