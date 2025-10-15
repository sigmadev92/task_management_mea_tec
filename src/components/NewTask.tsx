// Render Prop
import { Formik, Form, Field, ErrorMessage } from "formik";
import { message } from "antd";
import { useAppDispatch } from "../redux_toolkit/store/hooks";
import { taskThunk } from "../redux_toolkit/reducers/task/tasksSlice";
import type { NewTask } from "../types/task.types";
// import "antd/dist/reset.css";
const NewTaskComp = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full md:w-[50%] flex flex-col items-center p-3 outline-1">
      <h3>Add a new Task</h3>
      <Formik
        initialValues={{ title: "", description: "" }}
        validate={(values) => {
          const errors: { title?: string; desciption?: string } = {};

          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 3) {
            errors.title = "Please keep title atleast 3 characters long";
          }
          if (!values.description) {
            errors.desciption = "Description is required";
          } else if (values.description.length < 10) {
            errors.desciption =
              "Please keep Description atleast 3 characters long";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const task: NewTask = {
            title: values.title,
            description: values.description,
          };
          try {
            dispatch(taskThunk.addNewTask(task));
            resetForm();
          } catch (error: unknown) {
            message.error({ content: (error as Error).message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-3 w-full items-center justify-center flex flex-col gap-[1rem] outline-1">
            <Field
              type="text"
              name="title"
              className="border-b-[1px] p-1 focus:outline-0"
              placeholder="Enter title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-red-400"
            />
            <Field
              as="textarea"
              rows="5"
              name="description"
              className="border-[1px] p-1 focus:outline-0 resize-none"
              placeholder="Enter Description"
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

export default NewTaskComp;
