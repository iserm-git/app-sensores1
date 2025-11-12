export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateStudentCode = (code: string): boolean => {
  return code.length >= 6 && /^[A-Z0-9]+$/.test(code);
};

export const validateNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};
