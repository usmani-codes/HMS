import CustomAPIError from "../errors/custom-error.js"

export const notFound = (req, res, next) => {
    throw new CustomAPIError(404, "route not defined .. ")
}
