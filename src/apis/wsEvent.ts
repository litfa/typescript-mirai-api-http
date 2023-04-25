import type WebSocket from 'ws'
import { on } from '../utils/eventBus'
type Callback<T> = (data: T) => void

// ws事件
const close = (callback: Callback<WebSocket.CloseEvent>) => {
  on('close', (data) => {
    callback(data)
  })
}
const error = (callback: Callback<WebSocket.ErrorEvent>) => {
  on('error', (data) => {
    callback(data)
  })
}
const message = (callback: Callback<WebSocket.MessageEvent>) => {
  on('message', (data) => {
    callback(data)
  })
}
const open = (callback: Callback<WebSocket.Event>) => {
  on('open', (data) => {
    callback(data)
  })
}

export { close, error, message, open }
