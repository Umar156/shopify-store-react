import React, { useState } from "react";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";

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
    apiHandler(endpoint.SIGN_IN, "POST", formData)
      .then((res) => {
        console.log("User logged in successfully:", res);
      })
      .catch((err) => {
        console.log(err);
      });
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
