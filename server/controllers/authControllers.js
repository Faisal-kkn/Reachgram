import userHelpers from '../helpers/userHelpers.js'
import Schema from '../modules/user/register.js'

export default {
    userRegister : (req, res) => {
        try {
            const { error, value } = Schema.userRegisterSchema(req.body)
            if (error) {
                return res.status(422).json({ errors: error.details })
            }
            userHelpers.registerUser(value).then((response) => {
                res.status(200).json(response)
            }).catch((error) => {
                res.status(500).json({ message: error.message })
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    }
}

