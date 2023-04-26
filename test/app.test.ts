import { IncomingMessage } from 'http'
import { WebSocket } from 'ws'
import { CreateMiraiApi } from '../src/app'
import { on } from './eventBus'
import './ws'

test('连接参数', () => {
  CreateMiraiApi('localhost', 3333, 'admin123', 123456)
  on('connection', (ws: WebSocket, req: IncomingMessage) => {
    req.url
    expect(req.url).toBe('/all?verifyKey=admin123&qq=123456')
  })
})
