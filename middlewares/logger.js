import colors from 'colors' // Import colors is neccaesary to use colors in console else it'll be undefined

export const logger = (req, res, next) => {
    const colorMethod = {
        GET: 'green',
        POST: 'yellow',
        PUT: 'blue',
        DELETE: 'red'
    }

    const color = colorMethod[req.method] || 'white'
    console.log(`${req.method} ${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`[color])
    next()
}

