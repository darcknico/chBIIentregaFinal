import nodemailer from 'nodemailer'
import {config} from './index.js'

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  },
})

export const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: config.MAIL_USER,
    to,
    subject,
    html,
  })
}