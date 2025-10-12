// Render Prop
import { Formik, Form, Field, ErrorMessage } from "formik";
import { message } from "antd";
import { userActions } from "../redux_toolkit/reducers/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux_toolkit/store/hooks";
// import "antd/dist/reset.css";
const NewTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="w-[50%] flex flex-col items-center">
      <h3>Add a new Task</h3>
      <Formik
        initialValues={{ title: "" }}
        validate={(values) => {
          const errors: { title?: string } = {};

          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 3) {
            errors.title = "Please keep title atleast 3 characters long";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const task = {
            title: values.title,
            userId: user?.id,
          };
          try {
            const response = await fetch("/api/tasks", {
              method: "POST",
              body: JSON.stringify(task),
            });
            const data = await response.json();
            if (data.success) {
              message.success(
                {
                  content: "User LoggedIn successfully",
                },
                3
              );

              dispatch(userActions.setUser(data.user));
              navigate("/dashboard");
            } else {
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
          <Form className="p-3 w-full items-center justify-center flex flex-col gap-[1rem]">
            <Field
              type="text"
              name="title"
              className="border-b-[1px] p-1 focus:outline-0"
              placeholder="Enter a title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-red-400"
            />
            <Field
              type="textarea"
              name="description"
              className="border-b-[1px] p-1 focus:outline-0"
              placeholder="Enter a title"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-sm text-red-400"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0000ff] hover:bg-[#1540ecdc] px-[0.5rem] py-[0.3rem] text-white inline-block m-auto rounded-[0.3rem] cursor-pointer "
            >
              {isSubmitting ? "...Adding" : "Add"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTask;
