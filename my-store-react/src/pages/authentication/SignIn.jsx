import React, { useState } from "react";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";

import { signInFormFields } from "../../constants/auth_fields";
import Form from "../../components/auth/Form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputs = signInFormFields(formData, handleChange);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = {};
    if (!formData.email.trim()) {
      validationError.email = "Email is required !";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.email)) {
      validationError.email = "Email is invalid !";
    }
    if (!formData.password.trim()) {
      validationError.password = "Password is required !";
    } else if (formData.password.length < 6) {
      validationError.password = "Password should be at least 6 character !";
    }
    setErrors(validationError);
    apiHandler(endpoint.SIGN_IN, "POST", formData)
      .then((res) => {
        const authToken = res.headers.authorization;
        localStorage.setItem("JsonToken", authToken);
        console.log("User logged in successfully:", res);
        navigate("/home");
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
        errors={errors}
      />
    </div>
  );
};

export default SignIn;
