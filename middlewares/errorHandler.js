import CustomAPIError from '../errors/custom-error.js'

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ success: false, msg: err.message })
    }

    res.status(500).json({ success: false, msg: err.message })
}

export { errorHandler }