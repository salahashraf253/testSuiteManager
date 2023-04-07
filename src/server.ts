import http from 'http'
import { createApp } from './app'




const app = createApp()
const server = http.createServer(app)

server.listen(3000, () => {
    console.log('Server has started!')
})