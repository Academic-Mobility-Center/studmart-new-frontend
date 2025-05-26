// pages/api/send-question.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { from, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail", // или другой SMTP-провайдер
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from,
            to: "support@example.com", // кому отправляется вопрос
            subject,
            text,
        });

        res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Email send failed" });
    }
}
