import http from 'http'
import { createApp } from './app'




const app = createApp()
const server = http.createServer(app)

server.listen(process.env['PORT'], () => {
    console.log('Server has started!')
})