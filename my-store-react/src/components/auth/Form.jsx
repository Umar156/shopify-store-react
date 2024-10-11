import React from "react";
import { Link, useLocation } from "react-router-dom";

const Form = ({ inputs, buttonText, onSubmit, formTitle, errors }) => {
  const path = useLocation();
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 w-full">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-10 mb-4 w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">{formTitle}</h2>
        {inputs.map((input) => (
          <div key={input.name} className="mb-5">
            <label className="block text-gray-800 text-sm font-medium mb-1">
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              required={input.required}
              className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            {errors[input.name] && (
              <span className="text-red-600 text-sm">{errors[input.name]}</span>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          {buttonText}
        </button>
        <p className="text-sm text-center pt-3">
          {path.pathname === "/login" ? (
            <>
              Don't have an account?
              <Link to="/" className="text-blue-600">
                {" "}
                SignUp
              </Link>
            </>
          ) : (
            <>
              Already have an account?
              <Link to="/login" className="text-blue-600">
                {" "}
                Login
              </Link>
            </>
          )}{" "}
        </p>
      </form>
    </div>
  );
};

export default Form;
