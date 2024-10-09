import React, { useState } from "react";

import { signInFormFields } from "../../constants/auth_fields";
import Form from "../../components/auth/Form";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputs = signInFormFields(formData, handleChange);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello! Login");
  };
  return (
    <div>
      <Form
        inputs={inputs}
        buttonText="Login"
        onSubmit={handleSubmit}
        formTitle="Sign In"
      />
    </div>
  );
};

export default SignIn;
