import dotenv from 'dotenv'

dotenv.config(
    {
        override: true,
        path:"./.env"
    }
)

export const config = {
    BASE_URL: process.env.BASE_URL,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY, 
    DB_CONNECTION: process.env.DB_CONNECTION,

    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,

    BCRYPT_SALT_ROUNDS: 10,

}