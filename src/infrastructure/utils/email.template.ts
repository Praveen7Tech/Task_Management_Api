
export const EmailFormat = {
  otp: (otp: string) => ({
    subject: "Your One-Time Password",
    text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    html: `
    <div style="background:#121212;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:520px;margin:auto;background:#181818;border-radius:12px;padding:32px;text-align:center;color:#ffffff;">
        
        <h1 style="color:#1DB954;margin-bottom:10px;">Task Flow</h1>
        <p style="color:#b3b3b3;font-size:14px;">Secure sign-in verification</p>

        <div style="margin:30px 0;">
          <p style="font-size:16px;">Your One-Time Password</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:4px;color:#1DB954;">
            ${otp}
          </div>
          <p style="color:#b3b3b3;font-size:13px;margin-top:8px;">
            Expires in <strong>2 minutes</strong>
          </p>
        </div>

        <hr style="border:none;border-top:1px solid #2a2a2a;margin:30px 0;" />

        <p style="font-size:12px;color:#888;">
          If you didn't request this, you can safely ignore this email.
        </p>

      </div>
    </div>
    `
  })
};
