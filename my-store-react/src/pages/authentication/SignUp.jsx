import React, { useEffect, useState } from "react";
import Form from "../../components/auth/Form";
import { signUpFormFields } from "../../constants/auth_fields";
import { useLocation, useNavigate } from "react-router-dom";
import apiHandler from "../../utils/apiHandler";
import endpoint from "../../enums/endpoint";

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
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler(endpoint.SIGN_UP, "POST", formData)
      .then((res) => {
        console.log("User registered successfully:", res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setFormData((mailData) => ({ ...mailData, email: emailParam }));
    }
  }, [location]);
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
