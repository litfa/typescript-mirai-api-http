import { WebSocketServer } from 'ws'
import { emit } from './eventBus'

const mockServer = new WebSocketServer({
  port: 3333
})

mockServer.on('connection', (ws, req) => {
  emit('connection', ws, req)
})
