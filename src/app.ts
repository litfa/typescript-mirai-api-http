import WebSocket from 'ws'
import type { MessageChain } from './types/MessageChainType'
import type { Message } from './types/MessageType'
import type { Event } from './types/EventType'
import type {
  ApiMessage,
  FriendList,
  GroupList,
  MemberList,
  LatestMemberList,
  BotProfile,
  FriendProfile,
  MemberProfile,
  UserProfile
} from './types/ApiData'
import type * as MessageChainType from './types/MessageChainType'
import type * as CommonType from './types/Common'
import type * as MessageType from './types/MessageType'
import type * as EventType from './types/EventType'
import * as ApiDataType from './types/ApiData'
import { emit, on } from './utils/eventBus'
import { randomId } from './utils/utils'
import { close, error, message, open } from './apis/wsEvent'

const CreateMiraiApi = (
  host: string,
  port: number,
  verifyKey: string,
  qq: number,
  retryInterval: number | false = 5000
) => {
  type Data = { syncId: number; data: Message | Event }
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

  // bot消息事件
  const onMessage = <T = Data>(callback: Callback<T>) => {
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

  const getApi = <T>(command: string, content?: object): Promise<T> => {
    return new Promise((resolve) => {
      const id = randomId()
      send({
        syncId: id,
        command,
        content
      })
      onMessage<any>((data) => {
        if (data.syncId == id) {
          resolve(data)
        }
      })
    })
  }

  /**
   * 获取好友列表
   */
  const getFriendList = () => getApi<ApiMessage<FriendList>>('friendList')
  /**
   * 获取群列表
   */
  const getGroupList = () => getApi<ApiMessage<GroupList>>('groupList')
  /**
   * 获取群成员列表
   */
  const getMemberList = (target: number) => {
    return getApi<ApiMessage<MemberList>>('memberList', {
      target
    })
  }
  /**
   * 获取最新群成员列表
   */
  const getLatestMemberList = (target: number, memberIds: number[] = []) => {
    return getApi<ApiMessage<LatestMemberList>>('latestMemberList', {
      target,
      memberIds
    })
  }
  /**
   * 获取Bot资料
   */
  const getBotProfile = () => {
    return getApi<ApiMessage<BotProfile>>('botProfile')
  }
  /**
   * 获取好友资料
   */
  const getFriendProfile = (target: number) => {
    return getApi<ApiMessage<FriendProfile>>('friendProfile', {
      target
    })
  }
  /**
   * 获取群成员资料
   */
  const getMemberProfile = (target: number, memberId: number) => {
    return getApi<ApiMessage<MemberProfile>>('memberProfile', {
      target,
      memberId
    })
  }
  /**
   * 获取QQ用户资料
   */
  const getUserProfile = (target: number) => {
    return getApi<ApiMessage<UserProfile>>('userProfile', {
      target
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
    onFriendMessage,
    getFriendList,
    getGroupList,
    getMemberList,
    getLatestMemberList,
    getBotProfile,
    getFriendProfile,
    getMemberProfile,
    getUserProfile
  }
}

export { CreateMiraiApi }
export type { MessageChainType, MessageType, CommonType, ApiDataType, EventType }
