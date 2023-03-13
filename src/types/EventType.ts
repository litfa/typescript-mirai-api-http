import type { Friend, Group, GroupMember } from './Common'

/**
 * Bot登录成功
 */
export interface BotOnlineEvent {
  type: 'BotOnlineEvent'
}
/**
 * Bot主动离线
 */
export interface BotOfflineEventActive {
  type: 'BotOfflineEventActive'
}
/**
 * Bot被挤下线
 */
export interface BotOfflineEventForce {
  type: 'BotOfflineEventForce'
}
/**
 * Bot被服务器断开或因网络问题而掉线
 */
export interface BotOfflineEventDropped {
  type: 'BotOfflineEventDropped'
  qq: number
}
/**
 * Bot主动重新登录
 */
export interface BotReloginEvent {
  type: 'BotReloginEvent'
  qq: number
}
/**
 * 好友输入状态改变
 */
export interface FriendInputStatusChangedEvent {
  type: 'FriendInputStatusChangedEvent'
  friend: Friend
  inputting: boolean
}
/**
 * 好友昵称改变
 */
export interface FriendNickChangedEvent {
  type: 'FriendNickChangedEvent'
  friend: Friend
  from: string
  to: string
}
/**
 * Bot在群里的权限被改变
 */
export interface BotGroupPermissionChangeEvent {
  type: 'BotGroupPermissionChangeEvent'
  origin: string
  current: string
  group: Group
}
/**
 * Bot被禁言
 */
export interface BotMuteEvent {
  type: 'BotMuteEvent'
  durationSeconds: number
  operator: GroupMember
}
/**
 * Bot被取消禁言
 */
export interface BotUnmuteEvent {
  type: 'BotUnmuteEvent'
  operator: GroupMember
}
/**
 * Bot加入了一个新群
 * invitor - 如果被要求入群的话，则为邀请人的 Member 对象
 */
export interface BotJoinGroupEvent {
  type: 'BotJoinGroupEvent'
  group: Group
  invitor: null | GroupMember
}
/**
 * Bot主动退出一个群
 */
export interface BotLeaveEventActive {
  type: 'BotLeaveEventActive'
  group: Group
}
/**
 * Bot被踢出一个群
 * operator - Bot被踢后获取操作人的 Member 对象
 */
export interface BotLeaveEventKick {
  type: 'BotLeaveEventKick'
  group: Group
  operator: null | GroupMember
}
/**
 * Bot因群主解散群而退出群, 操作人一定是群主
 * operator - Bot离开群后获取操作人的 Member 对象
 */
export interface BotLeaveEventDisband {
  type: 'BotLeaveEventDisband'
  group: Group
  operator: null | GroupMember
}
/**
 * 群消息撤回
 */
export interface GroupRecallEvent {
  type: 'GroupRecallEvent'
  authorId: number
  messageId: number
  time: number
  group: Group
  operator: GroupMember
}
/**
 *  好友消息撤回
 */
export interface FriendRecallEvent {
  type: 'FriendRecallEvent'
  authorId: number
  messageId: number
  time: number
  operator: number
}
/**
 * 戳一戳事件
 */
export interface NudgeEvent {
  type: 'NudgeEvent'
  fromId: number
  subject: {
    id: number
    kind: 'Group' | 'Friend'
  }
}
/**
 * 某个群名改变
 */
export interface GroupNameChangeEvent {
  type: 'GroupNameChangeEvent'
  origin: string
  current: string
  group: Group
  operator: GroupMember
}
/**
 * 某群入群公告改变
 */
export interface GroupEntranceAnnouncementChangeEvent {
  type: 'GroupEntranceAnnouncementChangeEvent'
  origin: string
  current: string
  group: Group
  operator: GroupMember
}
/**
 * 全员禁言
 */
export interface GroupMuteAllEvent {
  type: 'GroupMuteAllEvent'
  origin: boolean
  current: boolean
  group: Group
  operator: GroupMember
}
/**
 * 匿名聊天
 */
export interface GroupAllowAnonymousChatEvent {
  type: 'GroupAllowAnonymousChatEvent'
  origin: boolean
  current: boolean
  group: Group
  operator: GroupMember
}
/**
 * 坦白说
 */
export interface GroupAllowConfessTalkEvent {
  type: 'GroupAllowConfessTalkEvent'
  origin: boolean
  current: boolean
  group: Group
  isByBot: boolean
}
/**
 * 允许群员邀请好友加群
 */
export interface GroupAllowMemberInviteEvent {
  type: 'GroupAllowMemberInviteEvent'
  origin: boolean
  current: boolean
  group: Group
  operator: GroupMember
}
/**
 * 新人入群的事件
 */
export interface MemberJoinEvent {
  type: 'MemberJoinEvent'
  member: GroupMember
  invitor: null
}
/**
 * 成员被踢出群（该成员不是Bot）
 */
export interface MemberLeaveEventKick {
  type: 'MemberLeaveEventKick'
  member: GroupMember
  operator: GroupMember
}
/**
 * 成员主动离群（该成员不是Bot）
 */
export interface MemberLeaveEventQuit {
  type: 'MemberLeaveEventQuit'
  member: GroupMember
}
/**
 * 群名片改动
 */
export interface MemberCardChangeEvent {
  type: 'MemberCardChangeEvent'
  origin: string
  current: string
  group: Group
  member: GroupMember
}
/**
 * 群头衔改动（只有群主有操作限权）
 */
export interface MemberSpecialTitleChangeEvent {
  type: 'MemberSpecialTitleChangeEvent'
  origin: string
  current: string
  member: GroupMember
}
/**
 * 成员权限改变的事件（该成员不是Bot）
 */
export interface MemberPermissionChangeEvent {
  type: 'MemberPermissionChangeEvent'
  origin: string
  current: string
  member: GroupMember
}
/**
 * 群成员被禁言事件（该成员不是Bot）
 */
export interface MemberMuteEvent {
  type: 'MemberMuteEvent'
  durationSeconds: number
  member: GroupMember
  operator: GroupMember
}
/**
 * 群成员被取消禁言事件（该成员不是Bot）
 */
export interface MemberUnmuteEvent {
  type: 'MemberUnmuteEvent'
  member: GroupMember
  operator: GroupMember
}
/**
 * 群员称号改变
 * action - 称号变化行为：achieve获得称号，lose失去称号
 */
export interface MemberHonorChangeEvent {
  type: 'MemberHonorChangeEvent'
  member: GroupMember
  action: 'achieve' | 'lose'
  honor: string
}
/**
 * 添加好友申请
 */
export interface NewFriendRequestEvent {
  type: 'NewFriendRequestEvent'
  eventId: number
  fromId: number
  groupId: number
  nick: string
  message: string
}
/**
 * 用户入群申请（Bot需要有管理员权限）
 * invitorId - 邀请人，可能为空
 */
export interface MemberJoinRequestEvent {
  type: 'MemberJoinRequestEvent'
  eventId: number
  fromId: number
  groupId: number
  groupName: string
  nick: string
  message: string
  invitorId: null | number
}
/**
 * Bot被邀请入群申请
 */
export interface BotInvitedJoinGroupRequestEvent {
  type: 'BotInvitedJoinGroupRequestEvent'
  eventId: number
  fromId: number
  groupId: number
  groupName: string
  nick: string
  message: string
}
/**
 * 其他客户端上线
 */
export interface OtherClientOnlineEvent {
  type: 'OtherClientOnlineEvent'
  client: {
    id: number
    platform: string
  }
  kind: number
}
/**
 * 其他客户端下线
 */
export interface OtherClientOfflineEvent {
  type: 'OtherClientOfflineEvent'
  client: {
    id: number
    platform: string
  }
}
/**
 * 命令被执行
 */
export interface CommandExecutedEvent {
  type: 'CommandExecutedEvent'
  name: string
  friend: null | Friend
  member: null | GroupMember
  args: {
    type: string
    text: string
  }[]
}

export type Event =
  | BotOnlineEvent
  | BotOfflineEventActive
  | BotOfflineEventForce
  | BotOfflineEventDropped
  | BotReloginEvent
  | FriendInputStatusChangedEvent
  | FriendNickChangedEvent
  | BotGroupPermissionChangeEvent
  | BotMuteEvent
  | BotUnmuteEvent
  | BotJoinGroupEvent
  | BotLeaveEventActive
  | BotLeaveEventKick
  | BotLeaveEventDisband
  | GroupRecallEvent
  | FriendRecallEvent
  | NudgeEvent
  | GroupNameChangeEvent
  | GroupEntranceAnnouncementChangeEvent
  | GroupMuteAllEvent
  | GroupAllowAnonymousChatEvent
  | GroupAllowConfessTalkEvent
  | GroupAllowMemberInviteEvent
  | MemberJoinEvent
  | MemberLeaveEventKick
  | MemberLeaveEventQuit
  | MemberCardChangeEvent
  | MemberSpecialTitleChangeEvent
  | MemberPermissionChangeEvent
  | MemberMuteEvent
  | MemberUnmuteEvent
  | MemberHonorChangeEvent
  | NewFriendRequestEvent
  | MemberJoinRequestEvent
  | BotInvitedJoinGroupRequestEvent
  | OtherClientOnlineEvent
  | OtherClientOfflineEvent
  | CommandExecutedEvent
