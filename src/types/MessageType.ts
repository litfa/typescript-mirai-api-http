/**
 * https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html
 */

import { MessageChain } from './MessageChainType'

export interface Sender {
  id: number
  nickname: string
  remark: string
}

export interface FriendMessage {
  type: 'FriendMessage'
  sender: Sender
  messageChain: MessageChain[]
}

export interface GroupMessageSender {
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

export interface GroupMessage {
  type: 'GroupMessage'
  sender: GroupMessageSender
  messageChain: MessageChain[]
}

export interface TempMessage {
  type: 'TempMessage'
  sender: GroupMessageSender
  messageChain: MessageChain[]
}

export interface StrangerMessage {
  type: 'StrangerMessage'
  sender: Sender
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
    nickname: string
    remark: string
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
