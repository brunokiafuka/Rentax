import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf8");
    const parsedTemplate = handlebars.compile(templateFileContent);
    const html = parsedTemplate(variables);

    const message = await this.client.sendMail({
      from: "Rentx <sender@rentex.com>",
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
