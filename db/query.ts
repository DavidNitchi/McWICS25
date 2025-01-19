"use server";

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
export async function editEducation(education: NewEducation) {
  const ret = await db.update(schema.education)
  .set({
    id: education.id,
    school: education.school,
    degree_type: education.degree_type,
    major: education.major,
    start_date: education.start_date,
    end_date: education.start_date,  
    userId: education.userId
  }).where(eq(schema.education.id!, education.id!));
  return ret
}

type NewProject = typeof schema.project.$inferInsert;
export async function addProject(project: NewProject) {
  console.log(project)
  const ret  = await db.insert(schema.project).values(project);
  console.log(ret)
  return ret
}
export async function editProject(project: NewProject) {
    const ret = await db.update(schema.project)
    .set({
      id: project.id,
      title: project.title,
      description: project.description,
      skills_used: project.skills_used,
      start_date: project.start_date,
      end_date: project.start_date,  
      userId: project.userId
    }).where(eq(schema.project.id!, project.id!));
    return ret
}
type NewWork = typeof schema.workExperience.$inferInsert;
export async function addWorkExperience(work: NewWork) {
  const ret = await db.insert(schema.workExperience).values(work);
  return ret
}
export async function editWork(work: NewWork) {
    const ret = await db.update(schema.workExperience)
    .set({
      id: work.id,
      title: work.title,
      description: work.description,
      skills_used: work.skills_used,
      start_date: work.start_date,
      end_date: work.start_date,  
      userId: work.userId
    }).where(eq(schema.workExperience.id!, work.id!));
    return ret
}
type NewExtraCurricular = typeof schema.extraCurricular.$inferInsert;
export async function addExtraCurricular(activity: NewExtraCurricular) {
  const ret = await db.insert(schema.extraCurricular).values(activity);
  return ret
}
export async function editExtraCurricular(activity: NewExtraCurricular) {
    const ret = await db.update(schema.extraCurricular)
    .set({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      userId: activity.userId
    }).where(eq(schema.extraCurricular.id!, activity.id!));
    return ret
}

