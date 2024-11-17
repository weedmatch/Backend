import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOptions } from '../types/interfaces/mail.inter';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import juice from 'juice';
import logger from './logger';

dotenv.config();

const compileTemplate = (templateName: string, placeholders?: Record<string, string>): string => {
  const filePath = path.join(__dirname, '../templates', `${templateName}.html`);
  const templateContent = fs.readFileSync(filePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  let html = template(placeholders);

  html = juice(html);

  return html;
};

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const user = '';
    const pass = ''
    const host = ''
    const port = parseInt(process.env.SMTP_PORT || '587');

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: false,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const html = compileTemplate(options.templateName, options.placeholders);

    const mailOptions = {
      from: '',
      to: options.to,
      subject: options.subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    // logger.info('Email sent:', info.response)
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
