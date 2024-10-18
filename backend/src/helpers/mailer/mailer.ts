import nodemailer, { SendMailOptions } from "nodemailer";
import { config } from "../../config";
import { logger } from "../../helpers";

const smtp = config.smtp;

const transporter = nodemailer.createTransport({
  ...config.smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err:any, info:any) => {
    if (err) {
      logger.error(err, "Error sending email");
      return;
    }

    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;