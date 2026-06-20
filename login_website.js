// script.js - Complete authentication system

// ==================== GLOBAL VARIABLES ====================
const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load remembered user
    const rememberedUser = localStorage.getItem('rememberedEmail');
    if (rememberedUser) {
        document.getElementById('loginEmail').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }

    // Check if user is already logged in
    if (currentUser) {
        showDashboard();
    } else {
        showLogin();
    }

    // Update navbar based on login status
    updateNavbar();
});

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showLogin() {
    showPage('loginPage');
    document.getElementById('loginForm').reset();
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
    document.getElementById('loginError').textContent = '';
}

function showSignup() {
    showPage('signupPage');
    document.getElementById('signupForm').reset();
    clearErrors();
}

function showForgotPassword() {
    showPage('forgotPasswordPage');
    document.getElementById('forgotPasswordForm').reset();
    document.getElementById('resetError').textContent = '';
}

function showDashboard() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('dashboardPage');
    updateDashboard();
}

function showProfile() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('profilePage');
    updateProfilePage();
}

function showSecurity() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('securityPage');
}

function showSettings() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('settingsPage');
}

function showAbout() {
    if (!currentUser) {
        showLogin();
        return;
    }
    showPage('aboutPage');
}

// ==================== VALIDATION FUNCTIONS ====================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function validatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthBar.className = 'password-strength';
        strengthText.textContent = '';
        return;
    }

    const strength = validatePasswordStrength(password);
    
    strengthBar.className = 'password-strength';
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.textContent = '⚠️ Weak password - Add more characters and variety';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.textContent = '✓ Medium strength - Good!';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = '✓ Strong password - Excellent!';
    }
}

function validateEmail2(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    const emailVerification = document.getElementById('emailVerification');
    if (emailVerification) {
        if (isValid) {
            emailVerification.textContent = '✓ Email format is valid';
            emailVerification.style.color = 'var(--success-color)';
        } else if (email.length > 0) {
            emailVerification.textContent = '✗ Please enter a valid email';
            emailVerification.style.color = 'var(--danger-color)';
        }
    }
    
    return isValid;
}

// ==================== LOGIN ====================
function handleLogin(event) {
    event.preventDefault();

    // Clear previous errors
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
    document.getElementById('loginError').textContent = '';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    let isValid = true;

    // Validation
    if (!email) {
        document.getElementById('loginEmailError').textContent = '📧 Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = '📧 Please enter a valid email';
        isValid = false;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = '🔐 Password is required';
        isValid = false;
    }

    if (!isValid) return;

    // Check login attempts
    const lastLockoutTime = localStorage.getItem('lockoutTime');
    if (lastLockoutTime && Date.now() - parseInt(lastLockoutTime) < LOCKOUT_TIME) {
        document.getElementById('loginError').textContent = 
            '🔒 Too many login attempts. Please try again later.';
        return;
    }

    // Find user
    const user = users.find(u => u.email === email);

    if (!user) {
        loginAttempts++;
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            localStorage.setItem('lockoutTime', Date.now().toString());
            document.getElementById('loginError').textContent = 
                '🔒 Account locked for security. Try again in 15 minutes.';
        } else {
            document.getElementById('loginError').textContent = 
                `❌ Invalid email or password. (Attempt ${loginAttempts}/${MAX_LOGIN_ATTEMPTS})`;
        }
        return;
    }

    // Check password
    if (user.password !== password) {
        loginAttempts++;
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            localStorage.setItem('lockoutTime', Date.now().toString());
            document.getElementById('loginError').textContent = 
                '🔒 Account locked for security. Try again in 15 minutes.';
        } else {
            document.getElementById('loginError').textContent = 
                `❌ Invalid email or password. (Attempt ${loginAttempts}/${MAX_LOGIN_ATTEMPTS})`;
        }
        return;
    }

    // Reset login attempts
    loginAttempts = 0;
    localStorage.removeItem('lockoutTime');

    // Remember email
    if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }

    // Update last login
    user.lastLogin = new Date().toLocaleString();
    user.loginCount = (user.loginCount || 0) + 1;

    // Login success
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    const successMsg = document.getElementById('loginSuccess');
    successMsg.style.display = 'block';
    successMsg.textContent = '✅ Login successful! Redirecting...';

    setTimeout(() => {
        showDashboard();
        updateNavbar();
    }, 1500);
}

// ==================== SIGNUP ====================
function handleSignup(event) {
    event.preventDefault();

    clearErrors();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let isValid = true;

    // Validation
    if (!name) {
        document.getElementById('signupNameError').textContent = '👤 Name is required';
        isValid = false;
    } else if (name.length < 3) {
        document.getElementById('signupNameError').textContent = '👤 Name must be at least 3 characters';
        isValid = false;
    }

    if (!email) {
        document.getElementById('signupEmailError').textContent = '📧 Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('signupEmailError').textContent = '📧 Please enter a valid email';
        isValid = false;
    } else if (users.some(u => u.email === email)) {
        document.getElementById('signupEmailError').textContent = '📧 Email already registered';
        isValid = false;
    }

    if (!password) {
        document.getElementById('signupPasswordError').textContent = '🔐 Password is required';
        isValid = false;
    } else if (!validatePassword(password)) {
        document.getElementById('signupPasswordError').textContent = '🔐 Password must be at least 6 characters';
        isValid = false;
    }

    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = '🔐 Please confirm your password';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = '🔐 Passwords do not match';
        isValid = false;
    }

    if (!agreeTerms) {
        document.getElementById('signupError').textContent = '✓ You must agree to the terms and conditions';
        isValid = false;
    }

    if (!isValid) return;

    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toLocaleString(),
        lastLogin: null,
        loginCount: 0,
        emailVerified: true
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    const successMsg = document.getElementById('signupSuccess');
    successMsg.style.display = 'block';
    successMsg.textContent = '✅ Account created successfully! Logging you in...';

    setTimeout(() => {
        // Auto login after signup
        currentUser = newUser;
        newUser.lastLogin = new Date().toLocaleString();
        newUser.loginCount = 1;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        showDashboard();
        updateNavbar();
    }, 1500);
}

// ==================== FORGOT PASSWORD ====================
function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('resetEmail').value.trim();
    document.getElementById('resetEmailError').textContent = '';
    document.getElementById('resetError').textContent = '';

    if (!email) {
        document.getElementById('resetEmailError').textContent = '📧 Email is required';
        return;
    }

    if (!validateEmail(email)) {
        document.getElementById('resetEmailError').textContent = '📧 Please enter a valid email';
        return;
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        // For security, don't reveal if email exists
        document.getElementById('resetSuccess').style.display = 'block';
        setTimeout(() => showLogin(), 2000);
        return;
    }

    // In a real app, send email
    console.log(`Password reset link would be sent to: ${email}`);

    document.getElementById('resetSuccess').style.display = 'block';
    setTimeout(() => showLogin(), 2000);
}

// ==================== CHANGE PASSWORD ====================
function handleChangePassword(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    let isValid = true;

    // Clear errors
    document.getElementById('currentPasswordError').textContent = '';
    document.getElementById('newPasswordError').textContent = '';
    document.getElementById('confirmNewPasswordError').textContent = '';

    // Validate current password
    if (currentPassword !== currentUser.password) {
        document.getElementById('currentPasswordError').textContent = '❌ Current password is incorrect';
        isValid = false;
    }

    // Validate new password
    if (!newPassword) {
        document.getElementById('newPasswordError').textContent = '🔐 New password is required';
        isValid = false;
    } else if (newPassword.length < 6) {
        document.getElementById('newPasswordError').textContent = '🔐 Password must be at least 6 characters';
        isValid = false;
    } else if (newPassword === currentPassword) {
        document.getElementById('newPasswordError').textContent = '🔐 New password must be different from current';
        isValid = false;
    }

    // Validate confirm password
    if (newPassword !== confirmNewPassword) {
        document.getElementById('confirmNewPasswordError').textContent = '🔐 Passwords do not match';
        isValid = false;
    }

    if (!isValid) return;

    // Update password
    currentUser.password = newPassword;
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    users[userIndex] = currentUser;

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('passwordChangeSuccess').style.display = 'block';
    document.getElementById('changePasswordForm').reset();

    setTimeout(() => {
        document.getElementById('passwordChangeSuccess').style.display = 'none';
    }, 3000);
}

// ==================== LOGOUT ====================
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showLogin();
        updateNavbar();
        alert('✅ You have been logged out successfully!');
    }
}

// ==================== DELETE ACCOUNT ====================
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        if (confirm('This action is permanent. Are you absolutely sure?')) {
            const password = prompt('Please enter your password to confirm:');
            
            if (password === currentUser.password) {
                // Remove user from users array
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                users.splice(userIndex, 1);
                localStorage.setItem('users', JSON.stringify(users));

                // Logout
                currentUser = null;
                localStorage.removeItem('currentUser');
                alert('✅ Your account has been deleted.');
                showLogin();
                updateNavbar();
            } else {
                alert('❌ Incorrect password. Account deletion cancelled.');
            }
        }
    }
}

// ==================== DASHBOARD ====================
function updateDashboard() {
    if (!currentUser) return;

    document.getElementById('welcomeName').textContent = currentUser.name;
    document.getElementById('sessionEmail').textContent = currentUser.email;
    document.getElementById('loginTime').textContent = currentUser.lastLogin || 'Just now';
    document.getElementById('sessionStatus').textContent = 'Active ✓';
}

// ==================== PROFILE PAGE ====================
function updateProfilePage() {
    if (!currentUser) return;

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('displayName').textContent = currentUser.name;
    document.getElementById('displayEmail').textContent = currentUser.email;
    document.getElementById('accountCreated').textContent = currentUser.createdAt;
    document.getElementById('lastLogin').textContent = currentUser.lastLogin || 'This is your first login';
}

function editProfile() {
    const newName = prompt('Enter your new name:', currentUser.name);
    if (newName && newName.length >= 3) {
        currentUser.name = newName;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        users[userIndex] = currentUser;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        updateProfilePage();
        alert('✅ Profile updated successfully!');
    } else if (newName) {
        alert('❌ Name must be at least 3 characters long');
    }
}

// ==================== SECURITY ====================
function enable2FA() {
    alert('🔐 Two-Factor Authentication\n\nThis feature will be available soon!\n\nYou will be able to enable 2FA using:\n- SMS verification\n- Email verification\n- Authenticator apps');
}

// ==================== NAVBAR UPDATE ====================
function updateNavbar() {
    const loginLink = document.getElementById('loginLink');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser) {
        loginLink.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}

// ==================== UTILITY FUNCTIONS ====================
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const type = field.type === 'password' ? 'text' : 'password';
    field.type = type;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkMode').checked = true;
    }
});

// ==================== REAL-TIME VALIDATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Email validation during typing
    const signupEmailInput = document.getElementById('signupEmail');
    if (signupEmailInput) {
        signupEmailInput.addEventListener('change', function() {
            validateEmail2(this.value);
        });
    }

    // Password strength check
    const signupPasswordInput = document.getElementById('signupPassword');
    if (signupPasswordInput) {
        signupPasswordInput.addEventListener('input', checkPasswordStrength);
    }
});

// ==================== SESSION MANAGEMENT ====================
// Auto logout after 30 minutes of inactivity
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
let inactivityTimer;

function resetInactivityTimer() {
    if (currentUser) {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            alert('⏰ Your session has expired due to inactivity. Please login again.');
            logout();
        }, INACTIVITY_TIMEOUT);
    }
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// ==================== SAMPLE USERS FOR TESTING ====================
// Create sample users if none exist
if (users.length === 0) {
    const sampleUsers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            createdAt: new Date().toLocaleString(),
            lastLogin: null,
            loginCount: 0,
            emailVerified: true
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'securepass456',
            createdAt: new Date().toLocaleString(),
            lastLogin: null,
            loginCount: 0,
            emailVerified: true
        }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
    console.log('✅ Sample users created for testing');
    console.log('Test Account 1 - Email: john@example.com, Password: password123');
    console.log('Test Account 2 - Email: jane@example.com, Password: securepass456');
}
