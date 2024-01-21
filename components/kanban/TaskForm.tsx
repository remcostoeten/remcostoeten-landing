'use client'

// Import React and useEffect from 'react' as before
import React, { useEffect } from "react";
import dayjs from "dayjs";



const taskLabels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "enhancement", label: "Enhancement" },
];
const taskStatus = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];
const formInitValues = {
  title: "",
  label: "feature",
  status: "open",
};

export const TaskForm: React.FC<{
  form: any; // Use 'any' for now, or replace it with a proper type
  init?: any; // Use 'any' for now, or replace it with a proper type
  taskId?: any; // Use 'any' for now, or replace it with a proper type
}> = ({ form, init = formInitValues, taskId }) => {
  const initValues = (() => {
    if (!init.due) return init;
    return { ...init, due: dayjs(init.due) };
  })();

  useEffect(() => {
    form.resetFields();
  }, [taskId, init, form]);

  return (
    <form
      name="task"
      className="flex flex-col space-y-4" // Add Tailwind CSS classes
      onSubmit={(e) => {
        e.preventDefault();
        // Add your form submission logic here
      }}
    >
      <label className="text-lg font-bold" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="rounded-md border border-gray-300 p-2"
        value={form.getFieldValue("title")}
        onChange={(e) => form.setFieldsValue({ title: e.target.value })}
      />

      <label className="text-lg font-bold" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="rounded-md border border-gray-300 p-2"
        value={form.getFieldValue("description")}
        onChange={(e) => form.setFieldsValue({ description: e.target.value })}
      />

      <label className="text-lg font-bold" htmlFor="label">
        Label
      </label>
      <select
        id="label"
        name="label"
        className="rounded-md border border-gray-300 p-2"
        value={form.getFieldValue("label")}
        onChange={(e) => form.setFieldsValue({ label: e.target.value })}
      >
        {taskLabels.map((label) => (
          <option key={label.value} value={label.value}>
            {label.label}
          </option>
        ))}
      </select>

      <label className="text-lg font-bold" htmlFor="status">
        Status
      </label>
      <select
        id="status"
        name="status"
        className="rounded-md border border-gray-300 p-2"
        value={form.getFieldValue("status")}
        onChange={(e) => form.setFieldsValue({ status: e.target.value })}
      >
        {taskStatus.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      <label className="text-lg font-bold" htmlFor="priority">
        Priority
      </label>
      <input
        type="number"
        id="priority"
        name="priority"
        className="rounded-md border border-gray-300 p-2"
        value={form.getFieldValue("priority")}
        onChange={(e) => form.setFieldsValue({ priority: e.target.value })}
      />

      <label className="text-lg font-bold" htmlFor="due">
        Due Date
      </label>
      <input
        type="datetime-local"
        id="due"
        name="due"
        className="rounded-md border border-gray-300 p-2"
        value={dayjs(form.getFieldValue("due")).format("YYYY-MM-DDTHH:mm")}
        onChange={(e) => form.setFieldsValue({ due: e.target.value })}
      />

      <button
        type="submit"
        className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};
