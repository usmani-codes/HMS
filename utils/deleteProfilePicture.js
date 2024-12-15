import fs from 'node:fs'
import CustomAPIError from '../errors/custom-error.js'

const deleteProfilePicture = async (user, filePath) => { //user is a db row, filePath must be absolute
    if (!user.profilePicture.includes('default-profile')) {
        await fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err.message)
                throw new CustomAPIError(404, 'file not found ..')
            }
            console.log("profile picture deleted ..")
        })
    }
}

export default deleteProfilePicture