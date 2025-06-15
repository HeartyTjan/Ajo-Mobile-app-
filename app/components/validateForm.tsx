type FormErrors = {
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
  confirmPassword?: string;
};
export default function validateForm(userInfo: any) {
  const errors: FormErrors = {};

  if (!userInfo.userName) errors.userName = "User Name is required";
  else if (userInfo.userName.length < 2) errors.userName = "Name is too short";

  const emailPattern = /\S+@\S+\.\S+/;

  if (!userInfo.email) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(userInfo.email)) {
    errors.email = "Email is invalid";
  }

  if (!userInfo.phone) {
    errors.phone = "Phone number is required";
  } else if (userInfo.phone.length !== 11) {
    errors.phone = "Phone number must be 11 digits";
  }
  if (!userInfo.password) {
    errors.password = "Password is required";
  } else if (userInfo.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
}
export { FormErrors };
