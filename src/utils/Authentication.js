// ==============================
// Email Validation
// ==============================
export const validateEmail = (email) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email.trim());
};

// ==============================
// Mobile Number Validation (India)
// ==============================
export const validateMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile.trim());
};

// ==============================
// Password Validation
// Minimum 8 characters,
// 1 Uppercase, 1 Lowercase,
// 1 Number, 1 Special Character
// ==============================
export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

  return regex.test(password);
};

// ==============================
// Name Validation
// ==============================
export const validateName = (name) => {
  const regex = /^[A-Za-z ]{3,50}$/;
  return regex.test(name.trim());
};

// ==============================
// Student PRN / ID
// Alphanumeric 6-20 chars
// ==============================
export const validateStudentId = (id) => {
  const regex = /^[A-Za-z0-9]{6,20}$/;
  return regex.test(id.trim());
};

// ==============================
// Website Validation
// ==============================
export const validateWebsite = (url) => {
  if (url === "") return true;

  const regex =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/;

  return regex.test(url.trim());
};

export const confirmPassword = (pass, pass1)=> pass === pass1;