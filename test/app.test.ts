import { IncomingMessage } from 'http'
import { WebSocket, RawData } from 'ws'
import { CreateMiraiApi } from '../src/app'
import { on } from './eventBus'

const { send } = CreateMiraiApi('localhost', 3333, 'admin123', 123456, false)
test('连接参数', () => {
  on('connection', (ws: WebSocket, req: IncomingMessage) => {
    req.url
    expect(req.url).toBe('/all?verifyKey=admin123&qq=123456')
  })
})

describe('api', () => {
  test('send', () => {
    on('open', () => {
      send({
        type: 'testMessage'
      })
    })
    on('message', (message: RawData) => {
      expect(message).toBe(
        JSON.stringify({
          type: 'testMessage'
        })
      )
    })
  })
})
