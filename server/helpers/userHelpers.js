
export default {
    registerUser: (data) => {
        try {
            console.log('saddadasda');
            console.log(data);

            let otp;
            async function main() {
                otp = Math.random();
                otp = otp * 1000000;
                otp = parseInt(otp)

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.ADMIN_MAIL_ID,
                        pass: process.env.ADMIN_PASSWORD,
                    },
                });

                let info = await transporter.sendMail({
                    from: process.env.ADMIN_MAIL_ID, // sender address
                    to: req.body.email, // list of receivers
                    subject: "OTP Varification", // Subject line
                    text: "OTP", // plain text body
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                });

                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            main().then(async (status) => {
                otp = otp.toString()
                req.body.otp = await bcrypt.hash(otp, 10)
                req.body.password = await bcrypt.hash(req.body.password, 10)
                req.body.phone = parseInt(req.body.phone)
                const registerUser = new userRegister(req.body)
                console.log(registerUser);
                registerUser.save().then(status => console.log(status)).catch(error => console.log(error));
            }).catch(console.error);
        } catch (error) {
            reject(error);
        }
    }
}