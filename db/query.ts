import * as schema from "./schema";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";

const db = drizzle({ schema });

export async function getUser(userEmail: string) {
  const ret = await db.query.usersTable.findFirst({
    where: eq(schema.usersTable.email, userEmail),
  });
  return ret
}

export async function getEducation(userEmail: string) {
  const ret = await db.query.education.findMany({
    where: eq(schema.education.userId, userEmail),
  });
  return ret
}

export async function getworkExperience(userEmail: string) {
  const ret = await db.query.workExperience.findMany({
    where: eq(schema.workExperience.userId, userEmail),
  });
  return ret
}

export async function getProject(userEmail: string) {
  const ret = await db.query.project.findMany({
    where: eq(schema.project.userId, userEmail),
  });
  return ret
}

export async function getExtracurricular(userEmail: string) {
  const ret = await db.query.extraCurricular.findMany({
    where: eq(schema.extraCurricular.userId, userEmail),
  });
  return ret
}

type NewUser = typeof schema.usersTable.$inferInsert;
export async function addUser(user: NewUser) {
  const ret = await db.insert(schema.usersTable).values(user);
  return ret;
}

type NewEducation = typeof schema.education.$inferInsert;
export async function addEducation(education: NewEducation) {
  const ret = await db.insert(schema.education).values(education);
  return ret
}

type NewProject = typeof schema.project.$inferInsert;
export async function addProject(project: NewProject) {
  const ret  = await db.insert(schema.project).values(project);
  return ret
}
type NewWork = typeof schema.workExperience.$inferInsert;
export async function addWorkExperience(work: NewWork) {
  const ret = await db.insert(schema.workExperience).values(work);
  return ret
}
type NewExtraCurricular = typeof schema.extraCurricular.$inferInsert;
export async function addExtraCurricular(activity: NewExtraCurricular) {
  const ret = await db.insert(schema.extraCurricular).values(activity);
  return ret
}
