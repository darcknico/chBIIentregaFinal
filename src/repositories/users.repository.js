import { userDAO, tokenDAO } from '../dao/index.js'
import bcrypt from 'bcrypt'
import UserDTO from '../dto/user.dto.js'
import { sendEmail } from '../config/mailer.config.js'
import { config } from '../config/index.js'
import jwt from 'jsonwebtoken'
import ValidationError from '../errors/validation.error.js'
import AuthenticationError from '../errors/authentication.error.js'
import NotFoundError from '../errors/not-found.error.js'
import * as tokenRepository from './token.repository.js'

export const registerUser = async (params) => {
    const existsEmail = await userDAO.getByEmail(params.email)
    if (existsEmail) {
        throw new ValidationError('El email ya existe');
    }
    const hashedPassword = bcrypt.hashSync(
        params.password,
        config.BCRYPT_SALT_ROUNDS
    )
    const data = { ...params, password: hashedPassword }
    const response = await userDAO.create(data)
    if (!response) {
        throw new ValidationError();
    }
    return new UserDTO(response)
}

export const loginUser = async (params) => {
    const user = await userDAO.getByEmail(params.email, {
        includePassword: true,
        includeId: true,
    })
    if (!user) {
        throw new AuthenticationError()
    }
    if (!bcrypt.compareSync(params.password, user.password)) {
        throw new AuthenticationError()
    }
    const token = jwt.sign(
        {id: user.id, email: user.email, rol: user.role},
        config.SECRET_KEY,
        {expiresIn:'24h'}
    )
    return { user: new UserDTO(user, { includeId: true }), token }
}

export const getUserById = async (id, config = {}) => {
    const user = await userDAO.getById(id)
    if (!user) throw new NotFoundError(`Usuario ${id} no encontrado`)
    return new UserDTO(user, config)
}

export const getUserByEmail = async (email, config = {}) => {
    const user = await userDAO.getByEmail(email)
    if (!user) throw new NotFoundError(`Usuario ${email} no encontrado`)
    return new UserDTO(user, config)
}

export const createUser = async (userInfo) => {
    const newUser = await userDAO.create(userInfo)
    return newUser
}

export const completeUpdateUserById = async (id, userInfo) => {
    const updatedUser = await userDAO.update(id, userInfo)
    if (!updatedUser) throw new NotFoundError(`Usuario ${id} no encontrado`)
    return updatedUser
}

export const updateUserById = async (id, userInfo) => {
    const updatedUser = await userDAO.update(id, userInfo)
    if (!updatedUser) throw new NotFoundError(`Usuario ${id} no encontrado`)
    return updatedUser
}

export const updatePassword = async (id, currentPassword, newPassword) => {
    const user = await getUserById(id)
    const isCurrentPasswordCorrect = bcrypt.compareSync(
        currentPassword,
        user.password
    )
    if (!isCurrentPasswordCorrect) {
        throw new ValidationError('La contraseña actual no es correcta')
    }
    const newHashedPassword = bcrypt.hashSync(
        newPassword,
        config.BCRYPT_SALT_ROUNDS
    )
    const updatedUser = await updateUserById(id, {
        password: newHashedPassword,
    })
    return updatedUser
}

export const sendPasswordRestoreEmail = async (email) => {
    const user = await userDAO.getByEmail(email)
    if (!user) {
        throw new NotFoundError('No se ha encontrado el usuario')
    }

    let data = await tokenDAO.getByUserId(user._id)
    if (!data) {
        data = await tokenRepository.createToken(user._id)
    }

    const link = `${config.BASE_URL}/api/sessions/password-restore/${data.token}`
    await sendEmail({
        to: user.email,
        subject: 'Reestablecer contraseña',
        html: `
        <p>Haz click <a href="${link}">aquí</a> para reestablecer tu contraseña</p>
        <p>En caso de no haber sido tu quien solicitó reestablecer la contraseña, ignora este correo</p>
        <p>Si no puede visualizar el link ${link}</p>
        `,
    })
}

export const restorePassword = async (token, newPassword) => {
    const userToken = await tokenDAO.getByToken(token)
    if (!userToken) {
        throw new ValidationError('Link inválido o expirado')
    }
    const newHashedPassword = bcrypt.hashSync(
        newPassword,
        config.BCRYPT_SALT_ROUNDS
    )
    const updatedUser = await updateUserById(userToken.user_id, {
        password: newHashedPassword,
    })
    await tokenDAO.delete({ user_id: userToken.user_id, token })
    return updatedUser
}