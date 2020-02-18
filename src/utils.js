import { adjectives, nouns } from './words';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';
import aligoapi from 'aligoapi';


export const generateSecretCode = () => {
    const randomNum = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomNum]} ${nouns[randomNum]}`;
}


export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
}

export const sendSecretMail = (emailAddress, loginSecret) => {
    const email = {
        from: "Ellicious",
        to: emailAddress,
        subject: "Ellicious에 오신걸 환영합니다.",
        html: `안녕하세요!! 시크릿 코드는  <strong>${loginSecret}</strong> 입니다.<br/> 로그인시 복사 붙여 넣어주세요.`
    }
    return sendMail(email);
}

export const sendSMS = (SMS) => {
    const AuthData = {
        key: process.env.ALIGO_SMS_API_KEY,
        user_id: process.env.ALIGO_SMS_USER_ID
    }

    return aligoapi.send(SMS, AuthData)
}

export const sendSecretSMS = (phoneNumber, secretNumber) => {
    const SMS = {
        sender: "01025371907",
        receiver: phoneNumber,
        msg: `인증코드는 ${secretNumber} 입니다`,
        msg_type: SMS,
        title: "Ellicious",
        // destination: % 고객명 % 치환용 입력
        // rdate: 예약일(현재일이상) // YYYYMMDD
        // rtime: 예약시간 - 현재시간기준 10분이후 // HHMM
        // image: 첨부이미지 // JPEG, PNG, GIF
    }

    return sendMail(SMS)
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);  //토큰생성!! id가 파라미터
