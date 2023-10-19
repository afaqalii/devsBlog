import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { loginInitialValues, loginValidationSchema } from "./loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { login } from "../../Features/UserAuth/AuthSlice";
import { auth, dbRef, provider } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { set } from "firebase/database";


const Login = () => {
  // states for this component 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //   function to run when form is submitted
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Handle login
      console.log(values);
      // Successfully authenticated
    } catch (error) {
      // Handle authentication errors
      setFieldError("email", "Invalid email or password");
      setFieldError("password", "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

   // sign up with gooogle popup
   const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch(login(user))
        if (user) {
          set(dbRef(`users/${user.uid}`), {
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
          })
            .then(() => {
              console.log("succes");
              navigate("/");
            })
            .catch((err) => console.log("Failure", err));
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-[480px]:min-w-full w-[450px] max-w-[450px] my-20 shadow px-5 py-10 rounded-2xl">
            <h1 className="font-bold text-[30px] mt-1 mb-3 text-center">
              Devs Blogs
            </h1>
            {fields.map((field) => (
              <div key={field.name} className="mt-2 mb-4">
                <label
                  htmlFor={field.name}
                  className="block ml-2 text-gray-700 text-sm font-bold mb-2"
                >
                  {field.label}
                </label>
                <Field
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 ml-2 text-xs mt-2"
                />
              </div>
            ))}
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Log In"}
            </button>
            <div className="flex items-center w-full justify-between mt-3">
              <span className="w-[45%] bg-black h-[1px]"></span>
              <span>OR</span>
              <span className="w-[45%] bg-black h-[1px]"></span>
            </div>
            <div onClick={handleGoogleSignIn} className="cursor-pointer flex items-center justify-center rounded-[5px] border-black border-[1px] border-solid py-[5px] w-full mt-2 gap-[5px]">
              <FcGoogle style={{ fontSize: "30px" }} />
              <p>Login with google account</p>
            </div>
            <p className="mt-3 text-xs">
              Don't have an account?{" "}
              <span className="font-bold text-sm text-blue-500">
                <Link to={"/signup"}>Sign up</Link>
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
