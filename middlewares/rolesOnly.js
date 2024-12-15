import CustomAPIError from "../errors/custom-error.js"

export const RolesOnly = (...allowedRoles) => { // RolesOnly("admin", "user")
    return (req, res, next) => {
        const payload = req.user
        console.log(payload.role, "and", allowedRoles)
        if (!allowedRoles.includes(payload.role)) {
            throw new CustomAPIError(403, "Access Denied ..")
        }

        next()
    }
}