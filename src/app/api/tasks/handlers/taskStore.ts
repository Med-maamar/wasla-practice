/**
 * File-backed task store for mock API handlers.
 *
 * The mock API persists tasks to a small JSON file under `.next/cache` so
 * create, update, and delete actions remain visible across separate requests
 * in both development and production servers.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { TaskDto } from "@/features/tasks/types";

const TASK_STORE_FILE = path.join(
  process.cwd(),
  ".next",
  "cache",
  "wasla-practice-tasks.json",
);

/**
 * Initial task list used when the store file does not exist yet.
 */
const initialTasks: TaskDto[] = [
  {
    id: "task-1",
    title: "Bootstrap Next.js 16 project",
    description: "Initialize the App Router project and install required dependencies.",
    status: "done",
    createdAt: "2026-03-16T08:00:00.000Z",
  },
  {
    id: "task-2",
    title: "Create the WASLA folder structure",
    description: "Set up documented placeholders for the feature-first modules.",
    status: "done",
    createdAt: "2026-03-16T09:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Build custom UI primitives",
    description: "Implement Button, Input, Card, Dialog, and Badge with Tailwind CSS.",
    status: "in-progress",
    createdAt: "2026-03-16T10:00:00.000Z",
  },
  {
    id: "task-4",
    title: "Validate public environment variables",
    description: "Use a dedicated Zod-backed env module instead of reading process.env directly.",
    status: "todo",
    createdAt: "2026-03-16T11:00:00.000Z",
  },
  {
    id: "task-5",
    title: "Implement mock BFF handlers",
    description: "Handle list, get, create, update, and delete actions for the tasks route.",
    status: "todo",
    createdAt: "2026-03-16T12:00:00.000Z",
  },
];

/**
 * Ensures the mock store file exists before any handler reads from it.
 *
 * @returns A promise that resolves once the store file is ready.
 */
async function ensureTaskStoreFile() {
  await mkdir(path.dirname(TASK_STORE_FILE), { recursive: true });

  try {
    await readFile(TASK_STORE_FILE, "utf8");
  } catch {
    await writeFile(TASK_STORE_FILE, JSON.stringify(initialTasks, null, 2), "utf8");
  }
}

/**
 * Reads the current task list from the mock store file.
 *
 * @returns The stored tasks.
 */
export async function readTaskStore() {
  await ensureTaskStoreFile();

  const fileContents = await readFile(TASK_STORE_FILE, "utf8");

  return JSON.parse(fileContents) as TaskDto[];
}

/**
 * Writes the next task list snapshot to the mock store file.
 *
 * @param tasks - Task collection to persist.
 * @returns A promise that resolves once the write completes.
 */
export async function writeTaskStore(tasks: TaskDto[]) {
  await ensureTaskStoreFile();
  await writeFile(TASK_STORE_FILE, JSON.stringify(tasks, null, 2), "utf8");
}
