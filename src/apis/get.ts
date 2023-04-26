import { randomId } from '../utils/utils'
import { send } from './send'
import { onMessage } from './onMessage'
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
} from '../types/ApiData'

export const getApi = <T>(
  command: string,
  subCommand: string | null,
  content?: object
): Promise<T> => {
  return new Promise((resolve) => {
    const id = randomId()
    send({
      syncId: id,
      command,
      subCommand,
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
export const getFriendList = () => getApi<ApiMessage<FriendList>>('friendList', null)
/**
 * 获取群列表
 */
export const getGroupList = () => getApi<ApiMessage<GroupList>>('groupList', null)
/**
 * 获取群成员列表
 */
export const getMemberList = (target: number) => {
  return getApi<ApiMessage<MemberList>>('memberList', null, {
    target
  })
}
/**
 * 获取最新群成员列表
 */
export const getLatestMemberList = (target: number, memberIds: number[] = []) => {
  return getApi<ApiMessage<LatestMemberList>>('latestMemberList', null, {
    target,
    memberIds
  })
}
/**
 * 获取Bot资料
 */
export const getBotProfile = () => {
  return getApi<ApiMessage<BotProfile>>('botProfile', null)
}
/**
 * 获取好友资料
 */
export const getFriendProfile = (target: number) => {
  return getApi<ApiMessage<FriendProfile>>('friendProfile', null, {
    target
  })
}
/**
 * 获取群成员资料
 */
export const getMemberProfile = (target: number, memberId: number) => {
  return getApi<ApiMessage<MemberProfile>>('memberProfile', null, {
    target,
    memberId
  })
}
/**
 * 获取QQ用户资料
 */
export const getUserProfile = (target: number) => {
  return getApi<ApiMessage<UserProfile>>('userProfile', null, {
    target
  })
}
