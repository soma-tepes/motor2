const User = require('../models/user.model')

exports.createUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body

        const user = await User.create({
            name,
            email,
            password,
            role,

        })

        res.status(200).json({
            status: 'Sucess',
            message: 'User Created with exited',
            user
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: "Failed ",
            message: "Failed create user",
            error
        })
    }

}


exports.findUserAll = async (req, res) => {
    try {
        const user = await User.findAll()
        res.status(200).json({
            status: 'sucess',
            message: "User GRN",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: "Failed ",
            message: "Failed create user",
            error
        })
    }
}


exports.findUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where: {
                id,
            
            }
        })
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `product with id ${id} not found!`,
            });
        }
        return res.status(200).json({
            status: "success",
            message: "user successfully!",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "fail",
            message: "Something went very wrong!",
            error,
        });
    }
}