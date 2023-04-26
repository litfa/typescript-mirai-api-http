import { Friend, Group, GroupMember, Profile } from './Common'

export interface ApiData {
  code: number
  msg: string
  type?: string
}

// 获取账号信息

/**
 * ## 获取好友列表
 * 使用此方法获取bot的好友列表
 */
export interface FriendList extends ApiData {
  data: Friend[]
}

/**
 * ## 获取群列表
 * 使用此方法获取bot的群列表
 */
export interface GroupList extends ApiData {
  data: Group[]
}

/**
 * ## 获取群成员列表
 * 使用此方法获取bot指定群中的成员列表
 */
export interface MemberList extends ApiData {
  data: GroupMember[]
}

/**
 * ## 获取最新群成员列表
 * 使用此方法获取bot指定群中的最新群成员列表
 */
export interface LatestMemberList extends ApiData {
  data: GroupMember[]
}
/**
 * ## 获取Bot资料
 * 此接口获取 session 绑定 bot 的详细资料
 */
export type BotProfile = Profile
/**
 * ## 获取好友资料
 * 此接口获取好友的详细资料
 */
export type FriendProfile = Profile
/**
 * ## 获取群成员资料
 * 此接口获取群成员的消息资料
 */
export type MemberProfile = Profile
/**
 * ## 获取QQ用户资料
 * 此接口获取获取QQ用户资料
 */
export type UserProfile = Profile

export interface ApiMessage<T = any> {
  syncId: number
  data: T
}

export interface GroupConfig {
  name?: string
  announcement?: string
  confessTalk?: boolean
  allowMemberInvite?: boolean
  autoApprove?: boolean
  anonymousChat?: boolean
  muteAll?: boolean
}
