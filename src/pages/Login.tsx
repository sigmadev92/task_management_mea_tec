// Render Prop
import { Formik, Form, Field, ErrorMessage } from "formik";
import { message } from "antd";
import { useAppDispatch } from "../redux_toolkit/store/hooks";
import { userActions } from "../redux_toolkit/reducers/user/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <main className=" box-border flex justify-center items-center overflow-hidden dark:bg-black">
      <div className="flex flex-col gap-4 items-center w-[95%] max-w-[450px] mt-[-3rem]">
        <h2 className="font-bold text-4xl dark:text-blue-500">Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors: { username?: string; password?: string } = {};

            if (!values.username) {
              errors.username = "username is required";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (
              values.password.length < 6 ||
              values.password.length > 12
            ) {
              errors.password = "Password must be 6 – 12 characters long";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values),
              });
              const data = await response.json();
              if (data.success) {
                resetForm();
                console.log(data);
                message.success(
                  {
                    content: "User LoggedIn successfully",
                  },
                  3
                );

                dispatch(userActions.setUser(data.user));
                navigate("/dashboard");
              } else {
                console.log(data.message);
                message.error(
                  {
                    content: data.message,
                  },
                  3
                );
              }
            } catch (error: unknown) {
              message.error({ content: (error as Error).message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-3 w-full items-center justify-center flex flex-col gap-[1rem] shadow-md shadow-black dark:shadow-amber-200">
              <div className="flex flex-col gap-[0.5rem] w-[70%]">
                <Field
                  type="text"
                  name="username"
                  className="border-b-[1px] dark:border-b-white p-1 focus:outline-0 placeholder:text-[0.8rem] dark:placeholder:text-[#67ffdd] dark:text-white"
                  placeholder="Enter you username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-400"
                />
              </div>
              <div className="flex flex-col gap-[0.5rem] w-[70%]">
                <Field
                  type="password"
                  name="password"
                  className="border-b-[1px] dark:border-b-white p-1 focus:outline-0 placeholder:text-[0.8rem] dark:placeholder:text-[#67ffdd]  dark:text-white"
                  placeholder="Your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0000ff] hover:bg-[#1540ecdc] px-[0.5rem] py-[0.3rem] text-white inline-block m-auto rounded-[0.3rem] cursor-pointer "
              >
                {isSubmitting ? "...Submitting" : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
