interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    Variables: any,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
