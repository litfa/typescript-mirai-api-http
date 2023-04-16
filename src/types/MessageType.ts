/**
 * https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html
 */

import { MessageChain } from './MessageChainType'
import { GroupMember, Friend } from './Common'

export interface FriendMessage {
  type: 'FriendMessage'
  sender: Friend
  messageChain: MessageChain[]
}

export interface GroupMessage {
  type: 'GroupMessage'
  sender: GroupMember
  messageChain: MessageChain[]
}

export interface TempMessage {
  type: 'TempMessage'
  sender: GroupMember
  messageChain: MessageChain[]
}

export interface StrangerMessage {
  type: 'StrangerMessage'
  sender: Friend
  messageChain: MessageChain[]
}

export interface OtherClientMessage {
  type: 'OtherClientMessage'
  sender: {
    id: number
    platform: string
  }
  messageChain: MessageChain[]
}

export interface FriendSyncMessage {
  type: 'FriendSyncMessage'
  subject: {
    id: number
    nickname: string
    remark: string
  }
  messageChain: MessageChain[]
}

export interface GroupSyncMessage {
  type: 'GroupSyncMessage'
  subject: {
    id: number
    name: string
    permission: string
  }
  messageChain: MessageChain[]
}

export interface TempSyncMessage {
  type: 'TempSyncMessage'
  subject: {
    id: number
    memberName: string
    specialTitle: string
    permission: string
    joinTimestamp: number
    lastSpeakTimestamp: number
    muteTimeRemaining: number
    group: {
      id: number
      name: string
      permission: string
    }
  }
  messageChain: MessageChain[]
}

export interface StrangerSyncMessage {
  type: 'StrangerSyncMessage'
  subject: {
    id: number
    nickname: string
    remark: string
  }
  messageChain: MessageChain[]
}

export type Message =
  | FriendMessage
  | GroupMessage
  | TempMessage
  | StrangerMessage
  | OtherClientMessage
  | FriendSyncMessage
  | GroupSyncMessage
  | TempSyncMessage
  | StrangerSyncMessage
