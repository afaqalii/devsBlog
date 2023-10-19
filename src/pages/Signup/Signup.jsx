import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { signupValidation, signupInitialValues } from "./signupSchema";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { ref, set } from "firebase/database";
import { auth, db, dbRef, provider } from "../../firebase";
import { login } from "../../Features/UserAuth/AuthSlice";
const Signup = () => {
  // components states
  const dispatch = useDispatch();
  const navigate = useNavigate()

 // function to run when form is submitted
 const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    // Sign up with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const user = userCredential.user;
    if (user) {
      // Update the user's profile (optional)
      await set(ref(db, `users/${user.uid}`), {
        username: values.name,
        email: user.email,
      });

      dispatch(login(user));
      navigate("/");
    }
  } catch (error) {
    console.error(error);
    setFieldError("email", "Invalid email or email already in use"); // Display the error message
  } finally {
    setSubmitting(false);
  }
};

  // sign up with gooogle popup
  const handleGoogleSignup = () => {
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

  // const sendDataToDatabase = () => {
  //   // Reference to a specific location (path) in the Realtime Database
  //   set(dbRef("users/afaq"), {
  //     username: "name",
  //     email: "email",
  //     profile_picture: "imageUrl",
  //   })
  //     .then(() => console.log("Succes"))
  //     .catch((err) => console.log("Failure"));
  // };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
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
      {/* <button onClick={sendDataToDatabase}>Send to DB</button> */}
      <Formik
        initialValues={signupInitialValues}
        validationSchema={signupValidation}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-[480px]:min-w-full w-[450px] max-w-[450px] my-20 shadow px-5 py-10 rounded-2xl">
            <h1 className="font-bold text-[30px] mt-1 mb-3 text-center">
              Devs Blogs
            </h1>
            {fields.map((field) => (
              <div key={field.name} className="mb-4">
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
              {isSubmitting ? "Loading..." : "Sign up"}
            </button>
            <div className="flex items-center w-full justify-between mt-3">
              <span className="w-[45%] bg-black h-[1px]"></span>
              <span>OR</span>
              <span className="w-[45%] bg-black h-[1px]"></span>
            </div>
            <div
              onClick={handleGoogleSignup}
              className="cursor-pointer flex items-center justify-center rounded-[5px] border-black border-[1px] border-solid py-[5px] w-full mt-2 gap-[5px]"
            >
              <FcGoogle style={{ fontSize: "30px" }} />
              <p>Signup with google account</p>
            </div>
            <p className="mt-3 text-xs">
              Already have an account?{" "}
              <span className="font-bold text-sm text-blue-500">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
