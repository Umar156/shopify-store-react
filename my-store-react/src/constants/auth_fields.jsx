export const signUpFormFields = (formData, handleChange) => [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    value: formData.firstName,
    onChange: handleChange,
    required: true,
  },
  {
    label: "Last Name",
    type: "text",
    name: "lastName",
    value: formData.lastName,
    onChange: handleChange,
    required: true,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    value: formData.email,
    onChange: handleChange,
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    value: formData.password,
    onChange: handleChange,
    required: true,
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    value: formData.confirmPassword,
    onChange: handleChange,
    required: true,
  },
];
export const signInFormFields = (formData, handleChange) => [
  {
    label: "Email",
    type: "email",
    name: "email",
    value: formData.email,
    onChange: handleChange,
    required: true,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    value: formData.password,
    onChange: handleChange,
    required: true,
  },
];
