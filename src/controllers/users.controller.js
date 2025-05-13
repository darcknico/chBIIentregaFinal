import UserDTO from '../dto/user.dto.js';
import * as userRepository from '../repositories/users.repository.js'

export const userRegister = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await userRepository.registerUser(body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { body } = req;
        const response = await userRepository.loginUser(body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}


export const userCurrent = (req, res, next) => {
    try {
        res.send({user: new UserDTO(req.user)});
    } catch (error) {
        next(error)
    }
}

export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await userRepository.getUserByEmail(email)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const sendRestoreEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userRepository.sendPasswordRestoreEmail(email)
        return res.status(200)
            .json({ message: 'Email enviado, verifique su casilla de correo' })
    } catch (error) {
        next(error)
    }
}

export const restorePassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await userRepository.restorePassword(
            token,
            password
        )
        return res.status(200)
            .json({
            message: 'Se ha modificado la contraseña correctamente',
            user,
        })
    } catch (error) {
        next(error)
    }
}