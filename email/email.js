app.post('/api/consultation', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
            <h3>Contact deatails </h3>
            <ul>

                <li>Name: ${req.body.name} </li>
                <li>Phone: ${req.body.phone} </li>
                <li>Email: ${req.body.email} </li>
            </ul>
            <h3> Message <h3>
            <p>${req.body.content}</p>

        `
        let mailerConfig = {    
            host: "smtpout.secureserver.net",  
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers:'SSLv3'
            },
            requireTLS:true,
            port: 465,
            debug: true,
            auth: {
                user: "pmpm3446@gmail.com",
                pass: "1234QWER"
            }
        };
        let transporter = nodemailer.createTransport(mailerConfig);

        let mailOptions = {
            from: 'testemail@gmail.com',
            to: 'pmpm3446@gmail.com',
            replyTo: 'testemail@gmail.com',
            subject: 'Some Subject',
            text: req.body.content,
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (error) {
              // ERROR SERVER RESPONSE
              res.status(500).send({status: 'FAIL', msg: 'Internal error: email not sent'})
            } else {
              // SUCCESS SERVER RESPONSE
              res.status(200).json({status: 'OK', msg: 'Email sent'})
            }
          });
    })
})