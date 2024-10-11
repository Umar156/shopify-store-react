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
  const [errors, setErrors] = useState({});
  const inputs = signUpFormFields(formData, handleChange);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = {};
    if (!formData.firstName.trim()) {
      validationError.firstName = "First Name is required !";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      validationError.firstName = "Name should contain only letters !";
    }
    if (!formData.lastName.trim()) {
      validationError.lastName = "Last Name is required !";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      validationError.lastName = "Name should contain only letters !";
    }
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
    if (!formData.confirmPassword.trim()) {
      validationError.confirmPassword = "Confirm Password is required !";
    } else if (formData.confirmPassword !== formData.password) {
      validationError.confirmPassword = "Password not matched !";
    }

    setErrors(validationError);
    if (Object.keys(validationError).length === 0) {
      alert("Form Submit Successfully");
    }

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
        errors={errors}
      />
    </div>
  );
};

export default SignUp;
