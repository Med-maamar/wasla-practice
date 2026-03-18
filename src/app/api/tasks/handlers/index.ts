/**
 * Tasks handler barrel file.
 *
 * The route dispatcher imports handlers from this module to keep the route file
 * focused on transport-level concerns.
 */
export * from "@/app/api/tasks/handlers/createHandler";
export * from "@/app/api/tasks/handlers/deleteHandler";
export * from "@/app/api/tasks/handlers/getHandler";
export * from "@/app/api/tasks/handlers/listHandler";
export * from "@/app/api/tasks/handlers/updateHandler";
