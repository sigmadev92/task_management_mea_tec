// Render Prop
import { Formik, Form, Field, ErrorMessage } from "formik";
import { message } from "antd";
import { useAppDispatch } from "../redux_toolkit/store/hooks";
import { taskThunk } from "../redux_toolkit/reducers/task/tasksSlice";
import type { Task } from "../types/task.types";
import React from "react";
// import "antd/dist/reset.css";
type ChildProp = {
  task: Task;
  setTask: (task: Task | null) => void;
};
const EditTaskComp: React.FC<ChildProp> = ({ task, setTask }) => {
  const { title, status, id, description } = task;
  const dispatch = useAppDispatch();
  return (
    <div className="w-[45%] flex flex-col items-center p-3 outline-1">
      <h3>Edit Task</h3>
      <span>Task Id : {id}</span>
      <Formik
        initialValues={{ title, description, status }}
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
          const { status, title, description } = values;
          try {
            dispatch(taskThunk.editTask({ title, id, description, status }));
            resetForm();
            setTask(null);
          } catch (error: unknown) {
            message.error({ content: (error as Error).message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="p-3 items-center w-full md:w-[80%] justify-center flex flex-col gap-[1rem]">
            <Field
              type="text"
              name="title"
              className="border-b-[1px] p-1 focus:outline-0 w-full"
              placeholder="Enter title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-sm text-red-400 flex"
            />
            <Field
              as="textarea"
              rows="5"
              name="description"
              className="border-[1px] p-1 focus:outline-0 resize-none w-full"
              placeholder="Enter Description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-sm text-red-400 flex"
            />
            <div className="w-full">
              <h3>Status</h3>
            </div>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="flex gap-2.5"
            >
              <label
                className={`outline-1 rounded-md px-2 py-1 cursor-pointer ${
                  values.status === "pending" ? "bg-[#6767dd]" : ""
                }`}
              >
                <Field
                  type="radio"
                  name="status"
                  value="pending"
                  className="hidden"
                />
                Pending
              </label>

              <label
                className={`outline-1 rounded-md px-2 py-1 cursor-pointer ${
                  values.status === "completed" ? "bg-[#6767dd]" : ""
                }`}
              >
                <Field
                  type="radio"
                  name="status"
                  value="completed"
                  className="hidden"
                />
                Completed
              </label>
            </div>
            <div>
              Picked:{" "}
              {values.status.charAt(0).toUpperCase() +
                values.status.substring(1)}
            </div>

            <div className="flex justify-center w-full gap-0.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0000ff] hover:bg-[#1540ecdc] px-[0.5rem] py-[0.3rem] text-white  rounded-[0.3rem] cursor-pointer "
              >
                {isSubmitting ? "...Updating" : "Update"}
              </button>
              <button
                className="bg-[#a319e8] hover:bg-[#b757f4dc] px-[0.5rem] py-[0.3rem] text-white  rounded-[0.3rem] cursor-pointer "
                type="button"
                onClick={() => setTask(null)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTaskComp;
