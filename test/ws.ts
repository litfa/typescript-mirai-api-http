import { WebSocketServer } from 'ws'
import { CreateMiraiApi } from '../src/app'
import { emit } from './eventBus'

const mockServer = new WebSocketServer({
  port: 3333
})

CreateMiraiApi('localhost', 3333, 'admin123', 123456)

mockServer.on('connection', (ws, req) => {
  emit('connection', ws, req)
})
