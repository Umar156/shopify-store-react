import React, { useState } from "react";
import Form from "../../components/auth/Form";
import { signUpFormFields } from "../../constants/auth_fields";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputs = signUpFormFields(formData, handleChange);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello!");
  };
  return (
    <div>
      <Form
        inputs={inputs}
        buttonText="Sign Up"
        onSubmit={handleSubmit}
        formTitle="Sign Up"
      />
    </div>
  );
};

export default SignUp;
