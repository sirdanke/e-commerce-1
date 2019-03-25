

module.exports = {
    isAdmin(req, res, next) {
        if (req.role != 'admin') {
            res.status(404).json({ message: 'your not authorize for this action' })
        } else {
            next()
        }
    }
}