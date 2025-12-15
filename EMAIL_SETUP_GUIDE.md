# Email Setup Guide - Gmail App Password

## Important: You need to set up a Gmail App Password

Your contact form is ready, but you need to complete ONE more step to receive emails:

### Step 1: Enable 2-Factor Authentication on Gmail

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable it

### Step 2: Generate App Password

1. After enabling 2FA, go back to Security
2. Under "Signing in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Type: "Portfolio Contact Form"
6. Click **Generate**
7. **COPY the 16-character password** (you won't see it again!)

### Step 3: Update Your .env File

Open `/server/.env` and replace `your_app_password_here` with your generated password:

```env
EMAIL_USER=silvianjeri730@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Your 16-character app password (no spaces needed)
```

### Step 4: Restart Your Server

After updating .env, restart your backend server:

1. Stop the current server (Ctrl+C in the terminal)
2. Run again: `node index.js`

## How It Works

When someone fills out your contact form:

1. **You receive an email** at `silvianjeri730@gmail.com` with:
   - Visitor's name
   - Visitor's email (as reply-to)
   - Their message
   
2. **They receive a confirmation email** saying you got their message

## Test It

1. Complete the setup above
2. Go to your portfolio: http://localhost:5173
3. Scroll to Contact section
4. Fill out the form with your own email
5. Click "Send Message"
6. Check your inbox!

## Troubleshooting

**Error: "Invalid login"**
- Make sure you generated an App Password (not your regular password)
- Make sure 2FA is enabled first

**Error: "Failed to send"**
- Check your .env file has the correct EMAIL_USER and EMAIL_PASSWORD
- Make sure you restarted the server after updating .env

**Not receiving emails?**
- Check spam folder
- Verify EMAIL_USER is correct in .env
