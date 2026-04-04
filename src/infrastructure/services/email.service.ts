
import nodemailer from 'nodemailer';
import { IEmailService } from '../../domain/services/email.service';
import { EmailFormat } from '../utils/email.template';

export class EmailService implements IEmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    // New Method: Handles the template internally to keep UseCase clean
    async sendOtpEmail(email: string, otp: string): Promise<void> {
        const template = EmailFormat.otp(otp);
        await this.transporter.sendMail({
            from: `"TaskManager" <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: template.subject,
            text: template.text,
            html: template.html,
        });
    }
}
