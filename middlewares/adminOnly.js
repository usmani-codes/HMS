export const AdminsOnly = async (req, res, next) => {
    const payload = req.user

    if (payload.role.toLowerCase() === 'admin') {
        console.log('welcome to admins only ..!! ')
    } else {
        return res.status(403).json({ success: false, msg: 'un-authorized!! admins only' })
    }
    next()
}