const sendMail = (toEmail, subject, body) => {
  window.Email.send({
    Host: "smtp.elasticemail.com",
    Username: "colak986@gmail.com",
    Password: "16350370AFCBC483A99426CF408F2A990F9F",
    To: toEmail,
    From: "colak986@gmail.com",
    Subject: subject,
    Body: body,
  });
};

export default sendMail;
