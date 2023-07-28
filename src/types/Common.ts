/**
 * 群成员
 * - [获取群成员列表](https://docs.mirai.mamoe.net/mirai-api-http/api/API.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E6%88%90%E5%91%98%E5%88%97%E8%A1%A8)
 * - [群消息](https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html#%E7%BE%A4%E6%B6%88%E6%81%AF)
 */
export interface GroupMember {
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

/**
 * 好友
 * [好友消息](https://docs.mirai.mamoe.net/mirai-api-http/api/MessageType.html#%E5%A5%BD%E5%8F%8B%E6%B6%88%E6%81%AF)
 * [获取好友列表](https://docs.mirai.mamoe.net/mirai-api-http/api/API.html#%E8%8E%B7%E5%8F%96%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)
 */
export interface Friend {
  id: number
  nickname: string
  remark: string
}

/**
 * 群聊
 * - [获取群列表](https://docs.mirai.mamoe.net/mirai-api-http/api/API.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8)
 */
export interface Group {
  id: number
  name: string
  permission: string
}

/**
 * 用户资料
 */
export interface Profile {
  nickname: string;
  email: string;
  age: number;
  level: number;
  sign: string;
  sex: string;
}

export interface SendMessageOption {
  syncId?: number
  quote?: number
  [name: string]: any
}