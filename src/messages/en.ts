/**
 * English translation catalog for the WASLA practice application.
 *
 * The `Messages` type exported from this file is used to guarantee that every
 * locale implements the same keys.
 */
export const en = {
  appTitle: "WASLA Task Manager",
  homeTitle: "Practice the WASLA architecture with a real task workflow.",
  homeDescription:
    "Use the mock BFF, custom primitives, and bilingual interface to manage tasks end to end.",
  openTasks: "Open tasks",
  tasks: "Tasks",
  createTask: "Create Task",
  editTask: "Edit Task",
  deleteTask: "Delete Task",
  deleteConfirmTitle: "Are you sure?",
  deleteConfirmDescription: "This action cannot be undone.",
  title: "Title",
  description: "Description",
  status: "Status",
  statusTodo: "To Do",
  statusInProgress: "In Progress",
  statusDone: "Done",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  loading: "Loading...",
  noTasks: "No tasks found.",
  previous: "Previous",
  next: "Next",
  page: "Page",
  language: "Language",
  english: "English",
  french: "French",
  loadError: "Unable to load tasks.",
  createSuccess: "Task created successfully.",
  updateSuccess: "Task updated successfully.",
  deleteSuccess: "Task deleted successfully.",
  submitError: "Unable to save the task.",
  deleteError: "Unable to delete the task.",
  emptyDescription: "No description provided.",
};

export type Messages = Record<keyof typeof en, string>;
