/**
 * https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html#%E6%B6%88%E6%81%AF%E7%B1%BB%E5%9E%8B
 */

export interface Source {
  type: 'Source'
  id: number
  time: number
}

export interface Quote {
  type: 'Quote'
  id: number
  groupId: number
  senderId: number
  targetId: number
  origin: MessageChain[]
}

export interface At {
  type: 'At'
  target: number
  display: string
}

export interface AtAll {
  type: 'AtAll'
}

export interface Face {
  type: 'Face'
  faceId: number
  name: string
}

export interface Plain {
  type: 'Plain'
  text: string
}

export interface Image {
  type: 'Image'
  // '{01E9451B-70ED-EAE3-B37C-101F1EEBF5B5}.mirai'
  imageId: string // 群图片格式
  // "imageId": "/f8f1ab55-bf8e-4236-b55e-955848d7069f"      // 好友图片格式
  url?: string
  path?: string
  base64?: string
}

export interface FlashImage {
  type: 'FlashImage'
  // '{01E9451B-70ED-EAE3-B37C-101F1EEBF5B5}.mirai' //群图片格式
  imageId: string
  // "imageId": "/f8f1ab55-bf8e-4236-b55e-955848d7069f"      //好友图片格式
  url: string
  path: string
  base64: string
}

export interface Voice {
  type: 'Voice'
  // 23C477720A37FEB6A9EE4BCCF654014F.amr
  voiceId: string
  url?: string
  path?: string
  base64?: string
  length?: number
}

export interface Xml {
  type: 'Xml'
  xml: string
}

export interface Json {
  type: 'Json'
  json: string
}

export interface App {
  type: 'App'
  content: string
}

export interface Poke {
  type: 'Poke'
  // 'Poke' | 'ShowLove' | 'Like' | 'Heartbroken' | 'SixSixSix' | 'FangDaZhao'
  name: string
}

export interface Dice {
  type: 'Dice'
  value: number
}

export interface MarketFace {
  type: 'MarketFace'
  id: number
  name: string
}

export interface MusicShare {
  type: 'MusicShare'
  kind: string
  title: string
  summary: string
  jumpUrl: string
  pictureUrl: string
  musicUrl: string
  brief: string
}

export interface Forward {
  type: 'Forward'
  nodeList: {
    senderId: number
    time: number
    senderName: string
    messageChain: MessageChain[]
    messageId: number
    messageRef: {
      messageId: number
      target: number
    }
  }[]
}

export interface FileType {
  type: 'File'
  id: number
  name: string
  size: number
}

export interface MiraiCode {
  type: 'MiraiCode'
  code: string
}

export type MessageChain =
  | Quote
  | Source
  | At
  | AtAll
  | Face
  | Plain
  | Image
  | FlashImage
  | Voice
  | Xml
  | Json
  | App
  | Poke
  | Dice
  | MarketFace
  | MusicShare
  | Forward
  | FileType
  | MiraiCode
