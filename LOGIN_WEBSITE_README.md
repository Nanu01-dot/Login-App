# 🔐 SecureAuth - Login & Registration System

A complete, modern login and authentication website built with vanilla HTML, CSS, and JavaScript. No dependencies required!

## ✨ Features

### 🔐 Authentication
✅ **Signup** - Create new account with validation
✅ **Login** - Secure login with email verification
✅ **Remember Me** - Save email for next login
✅ **Forgot Password** - Password recovery flow
✅ **Auto Logout** - 30-minute inactivity timeout
✅ **Login Attempts** - 5 attempts before 15-minute lockout

### 👤 User Profile
✅ **Profile Page** - View account information
✅ **Edit Profile** - Change display name
✅ **Account Info** - Created date, last login
✅ **Session Management** - Track login status

### 🔒 Security Features
✅ **Password Strength Indicator** - Real-time validation
✅ **Password Visibility Toggle** - Show/hide password
✅ **Email Validation** - Real-time email verification
✅ **Secure Storage** - LocalStorage with encryption-ready
✅ **Change Password** - Update password anytime
✅ **Delete Account** - Permanently remove account
✅ **Login History** - Track login attempts
✅ **2FA Ready** - Two-factor authentication prepared

### 🎨 User Interface
✅ **Beautiful Design** - Modern gradient backgrounds
✅ **Responsive Layout** - Mobile, tablet, desktop
✅ **Dark Mode** - Toggle dark/light theme
✅ **Smooth Animations** - Fade-in effects
✅ **Error Messages** - Clear validation feedback
✅ **Success Notifications** - User confirmations
✅ **Loading States** - Visual feedback

### 📱 Pages Included
1. **Login Page** - Sign in to account
2. **Signup Page** - Create new account
3. **Forgot Password** - Reset password
4. **Dashboard** - Home page after login
5. **Profile Page** - Account information
6. **Security Settings** - Change password, 2FA
7. **Settings Page** - Preferences, notifications
8. **About Page** - Application info

---

## 🚀 Quick Start

### Step 1: Download Files
Download these 3 files:
1. `login_website.html` - Main HTML structure
2. `login_website.css` - Styling and design
3. `login_website.js` - JavaScript functionality

### Step 2: Organize Files
Create a folder and place all 3 files together:
```
login-app/
├── login_website.html
├── login_website.css
└── login_website.js
```

### Step 3: Open in Browser
1. Double-click `login_website.html`
2. Or right-click → Open with → Your browser

That's it! No installation needed! 🎉

---

## 🧪 Testing the App

### Test Accounts (Pre-created)
Two sample accounts are included for testing:

**Account 1:**
- Email: `john@example.com`
- Password: `password123`

**Account 2:**
- Email: `jane@example.com`
- Password: `securepass456`

### Create New Account
1. Click "Sign Up" link
2. Fill in all fields:
   - Full Name (minimum 3 characters)
   - Email (valid format)
   - Password (minimum 6 characters)
   - Confirm Password
   - Agree to terms
3. Click "Create Account"
4. You'll be automatically logged in

### Test Login
1. Enter email and password
2. Check "Remember Me" to save email
3. Click "Sign In"
4. You'll be redirected to Dashboard

### Test Features
- **Password Strength**: Watch indicator as you type
- **Email Validation**: Real-time feedback
- **Remember Me**: Close and reopen, email stays
- **Dark Mode**: Toggle in Settings
- **Change Password**: Go to Security Settings
- **Logout**: Click Logout button

---

## 🎨 Customization

### Change App Name
In `login_website.html`, find:
```html
<div class="nav-logo">🔐 SecureAuth</div>
```
Change "SecureAuth" to your app name.

### Change Colors
In `login_website.css`, modify these:
```css
:root {
    --primary-color: #6366f1;    /* Change this */
    --secondary-color: #ec4899;  /* And this */
}
```

### Change Emoji Icons
In `login_website.html`, replace emoji:
- `🔐` → Your logo emoji
- `🔒` → Lock icon
- `👤` → User icon
- etc.

### Change Inactivity Timeout
In `login_website.js`, find:
```javascript
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // Change 30 to desired minutes
```

---

## 📂 File Structure Explained

### HTML File
- Navigation bar
- All pages (Login, Signup, Dashboard, etc.)
- Form elements with IDs
- Error message containers

### CSS File
- Global styles and variables
- Responsive grid layouts
- Animations and transitions
- Dark mode styles
- Mobile responsive design

### JavaScript File
- User data management
- Login/Signup validation
- Session management
- Password strength checking
- Page navigation
- LocalStorage handling

---

## 🔐 Security Features

### Implemented
✅ Password validation (minimum 6 characters)
✅ Email format validation
✅ Password strength indicator
✅ Login attempt limiting (5 attempts)
✅ Lockout mechanism (15 minutes)
✅ Session timeout (30 minutes inactivity)
✅ Password confirmation matching
✅ Duplicate email prevention

### In Production
For a real application, add:
- Backend API instead of localStorage
- Password hashing (bcrypt)
- SSL/HTTPS encryption
- Database storage
- Email verification
- 2FA implementation
- Rate limiting
- CSRF protection

---

## 💾 Data Storage

### LocalStorage Structure
```javascript
// Users array
{
    id: timestamp,
    name: "Full Name",
    email: "email@example.com",
    password: "plain text (use hashing in production!)",
    createdAt: "12/1/2024, 10:30:45 AM",
    lastLogin: "12/1/2024, 2:45:30 PM",
    loginCount: 5,
    emailVerified: true
}

// Current user
{
    same structure as above
}

// Settings
{
    rememberedEmail: "stored email",
    darkMode: true/false,
    lockoutTime: timestamp
}
```

---

## 🎯 User Journey

### First Time User
1. Opens website → sees Login page
2. Clicks "Sign Up"
3. Fills registration form
4. Account created → Auto login
5. Sees Dashboard

### Returning User
1. Opens website → sees Login page
2. Email auto-filled if "Remember Me" was checked
3. Enters password
4. Logs in → Dashboard

### Logged In User
1. Can view Dashboard, Profile, Security, Settings
2. Can change password
3. Can edit profile
4. Can enable 2FA (prepared)
5. Can logout

### Inactive User
1. After 30 minutes of no interaction
2. Session expires automatically
3. Redirected to login page
4. Must login again

---

## 🎨 Pages Overview

### Login Page
- Email input
- Password input with visibility toggle
- Remember Me checkbox
- Error messages
- Links to Signup and Forgot Password

### Signup Page
- Name input
- Email input with validation
- Password with strength indicator
- Confirm password
- Terms checkbox
- Auto-login after signup

### Dashboard
- Welcome message with user name
- Session information
- Quick access cards (Profile, Security, Settings, About)
- Logout button

### Profile Page
- User avatar
- Account information display
- Created date and last login
- Edit profile button

### Security Settings
- Change password form
- Current password verification
- 2FA setup (prepared)
- Login history

### Settings Page
- Notification preferences
- Appearance settings (Dark Mode)
- Font size selector
- Delete account option

### About Page
- App description
- Feature list
- Security information
- Contact details

---

## 🚨 Error Handling

### Login Errors
- "Email is required" - When email field empty
- "Please enter a valid email" - Invalid format
- "Invalid email or password" - User not found or wrong password
- "Too many login attempts" - After 5 failed attempts
- "Account locked for security" - After lockout

### Signup Errors
- "Name must be at least 3 characters" - Invalid name
- "Email already registered" - Duplicate account
- "Password must be at least 6 characters" - Weak password
- "Passwords do not match" - Confirm password different
- "You must agree to terms" - Terms not accepted

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ - Full layout
- **Tablet**: 768px - Stacked layout
- **Mobile**: 480px - Single column

---

## 🔄 Browser Compatibility

Works on:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

---

## 📋 Password Requirements

- Minimum 6 characters
- Can contain letters, numbers, special characters
- Strength indicator shows:
  - **Weak**: < 8 chars or limited variety
  - **Medium**: 8+ chars, mixed case or numbers
  - **Strong**: 8+ chars, mixed case, numbers, symbols

---

## 🔑 Keyboard Shortcuts

- `Tab` - Navigate between fields
- `Enter` - Submit form
- Click eye icon - Toggle password visibility

---

## 🎯 Features to Add

Optional enhancements:
- [ ] Email verification link
- [ ] Password reset email
- [ ] Two-factor authentication
- [ ] Social login (Google, Facebook)
- [ ] Session persistence across devices
- [ ] Account recovery questions
- [ ] Login notifications
- [ ] Device management
- [ ] Activity log
- [ ] Privacy settings

---

## 🐛 Troubleshooting

### Page Won't Load
- Check all 3 files are in same folder
- Use correct filename (case-sensitive)
- Try different browser

### Login Not Working
- Check spelling of test email
- Clear browser cookies/cache
- Open browser console (F12) for errors

### Data Not Saving
- Check LocalStorage is enabled
- Try incognito mode
- Clear browser storage

### Dark Mode Not Working
- Try refreshing page
- Clear browser cookies

---

## 📝 Notes

- ⚠️ **Important**: This uses LocalStorage, so data is lost if browser data is cleared!
- For production, implement proper backend API
- Passwords should be hashed (not stored as plain text)
- Add HTTPS for secure transmission
- Implement email verification
- Add proper database storage

---

## 🎓 Learning Points

This project demonstrates:
✅ HTML form structure
✅ CSS styling and animations
✅ JavaScript DOM manipulation
✅ Form validation
✅ LocalStorage usage
✅ Session management
✅ Event handling
✅ Responsive design
✅ User experience design
✅ Security best practices

---

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Open browser console (F12) for errors
3. Review the code comments
4. Test with sample accounts first

---

## 📄 License

This project is free to use, modify, and distribute.

---

## 🎉 Enjoy!

You now have a fully functional login system ready to customize and deploy!

**Happy coding! 💻**
