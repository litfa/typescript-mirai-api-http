import { GroupMember } from 'Common'
import { getApi } from './get'
import { ApiMessage, ApiData, GroupConfig } from 'ApiData'

/**
 * 禁言群成员
 * 使用此方法指定群禁言指定群员（需要有相关权限）
 * @param target 指定群的群号
 * @param memberId 指定群员QQ号
 * @param time 禁言时长，单位为秒，最多30天，默认为0
 */
export const mute = (target: number, memberId: number, time = 0) => {
  return getApi<ApiMessage<ApiData>>('mute', null, {
    target,
    memberId,
    time
  })
}
/**
 * 解除群成员禁言
 * 使用此方法指定群解除群成员禁言（需要有相关权限）
 * @param target 指定群的群号
 * @param memberId 指定群员QQ号
 */
export const unmute = (target: number, memberId: number) => {
  return getApi<ApiMessage<ApiData>>('unmute', null, {
    target,
    memberId
  })
}
/**
 * 移除群成员
 * 使用此方法移除指定群成员（需要有相关权限）
 * @param target 指定群的群号
 * @param memberId 指定群员QQ号
 * @param block 移除后拉黑，默认为 false
 * @param msg 信息
 */
export const kick = (target: number, memberId: number, block = false, msg = '') => {
  return getApi<ApiMessage<ApiData>>('kick', null, {
    target,
    memberId,
    block,
    msg
  })
}
/**
 * 退出群聊
 * 使用此方法使Bot退出群聊
 * @param target 退出的群号
 */
export const quit = (target: number) => {
  return getApi<ApiMessage<ApiData>>('quit', null, {
    target
  })
}
/**
 * 全体禁言
 * 使用此方法令指定群进行全体禁言（需要有相关权限）
 */
export const muteAll = (target: number) => {
  return getApi<ApiMessage<ApiData>>('muteAll', null, {
    target
  })
}
/**
 * 解除全体禁言
 * 使用此方法令指定群解除全体禁言（需要有相关权限）
 */
export const unmuteAll = (target: number) => {
  return getApi<ApiMessage<ApiData>>('unmuteAll', null, {
    target
  })
}
/**
 * 设置群精华消息
 * 使用此方法添加一条消息为精华消息（需要有相关权限）
 * @param messageId 精华消息的messageId
 * @param target 群id
 */
export const setEssence = (messageId: number, target: number) => {
  return getApi<ApiMessage<ApiData>>('setEssence', null, {
    messageId,
    target
  })
}

/**
 * 获取群设置
 * 使用此方法获取群设置
 */
export const getGroupConfig = (target: number) => {
  return getApi<ApiMessage<GroupConfig>>('groupConfig', 'get', {
    target
  })
}
/**
 * 修改群设置
 * 使用此方法修改群设置（需要有相关权限）
 */
export const updateGroupConfig = (target: number, config: GroupConfig) => {
  return getApi<ApiMessage<ApiData>>('groupConfig', 'update', {
    target,
    config
  })
}
/**
 * 获取群员设置
 * 使用此方法获取群员设置
 */
export const getMemberInfo = (target: number, memberId: number) => {
  return getApi<ApiMessage<GroupMember>>('memberInfo', 'get', {
    target,
    memberId
  })
}
/**
 * 修改群员设置
 * 使用此方法修改群员设置（需要有相关权限）
 * @param target 指定群的群号
 * @param memberId 群员QQ号
 * @param info.name 群名片，即群昵称
 * @param info.specialTitle 群头衔
 */
export const updateMemberInfo = (
  target: number,
  memberId: number,
  info: { name?: string; specialTitle?: string }
) => {
  return getApi<ApiMessage<ApiData>>('memberInfo', 'update', {
    target,
    memberId,
    info
  })
}
/**
 * 修改群员管理员
 * 使用此方法修改群员的管理员权限（需要有群主权限）
 * @param target 指定群的群号
 * @param memberId 群员QQ号
 * @param assign 是否设置为管理员
 */
export const memberAdmin = (target: number, memberId: number, assign: boolean) => {
  return getApi<ApiMessage<ApiData>>('memberAdmin', null, {
    target,
    memberId,
    assign
  })
}
