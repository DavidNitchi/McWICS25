import * as schema from "./schema";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

const db = drizzle({ schema });

export async function getUser(userEmail: string) {
  await db.query.usersTable.findFirst({
    where: eq(schema.usersTable.email, userEmail),
  });
}

export async function getEducation(userEmail: string) {
  await db.query.education.findMany({
    where: eq(schema.education.userId, userEmail),
  });
}

export async function getworkExperience(userEmail: string) {
  await db.query.workExperience.findMany({
    where: eq(schema.workExperience.userId, userEmail),
  });
}

export async function getProject(userEmail: string) {
  await db.query.project.findMany({
    where: eq(schema.project.userId, userEmail),
  });
}

export async function getExtracurricular(userEmail: string) {
  await db.query.extraCurricular.findMany({
    where: eq(schema.extraCurricular.userId, userEmail),
  });
}

type NewUser = typeof schema.usersTable.$inferInsert;
export async function addUser(user: NewUser) {
  console.log(user);
  const data = await db.insert(schema.usersTable).values(user);
  return data;
}

type NewEducation = typeof schema.education.$inferInsert;
export async function addEducation(education: NewEducation) {
  return db.insert(schema.education).values(education);
}

type NewProject = typeof schema.project.$inferInsert;
export async function addProject(project: NewProject) {
  return db.insert(schema.project).values(project);
}
type NewWork = typeof schema.workExperience.$inferInsert;
export async function addWorkExperience(work: NewWork) {
  return db.insert(schema.workExperience).values(work);
}
type NewExtraCurricular = typeof schema.extraCurricular.$inferInsert;
export async function addExtraCurricular(activity: NewExtraCurricular) {
  return db.insert(schema.extraCurricular).values(activity);
}
