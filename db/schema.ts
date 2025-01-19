import { integer, pgTable, serial, text, json, date, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';


export const usersTable = pgTable('users_table', {
  //id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique().primaryKey(),
  password: text('password').notNull(),
  skills: json().default([])
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  education: many(education),
  workExperience: many(workExperience),
  project: many(project),
	extraCurricular: many(extraCurricular)
}));


export const extraCurricular = pgTable('extra_curricular', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    userId: text('user_id')
    .notNull()
    .references(() => usersTable.email, { onDelete: 'cascade' }),
});

export const extraCurricularRelations = relations(extraCurricular, ({ one }) => ({
	user: one(usersTable, {
		fields: [extraCurricular.userId],
		references: [usersTable.email],
	}),
}));

export const education = pgTable('education', {
    id: text('id').notNull().primaryKey(),
    school: text('title').notNull(),
    degree_type: text('degree').notNull(),
    major: text('major').notNull(),
    start_date: date(),
    end_date: date(),  
    userId: text('user_id')
    .notNull()
    .references(() => usersTable.email, { onDelete: 'cascade' }),
});


export const educationRelations = relations(education, ({ one }) => ({
	user: one(usersTable, {
		fields: [education.userId],
		references: [usersTable.email],
	}),
}));

export const workExperience = pgTable('work_experience', {
  id: text('id').notNull().primaryKey(),
  title: text('title').notNull(),
  company: text('company'),
  description: text('description').notNull(),
  skills_used: json().default([]),
  start_date: date(),
  end_date: date(),
  current_job: boolean(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.email, { onDelete: 'cascade' }),
});

export const workExperienceRelations = relations(workExperience, ({ one }) => ({
	user: one(usersTable, {
		fields: [workExperience.userId],
		references: [usersTable.email],
	}),
}));

export const project = pgTable('project', {
    id: text('id').notNull().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    skills_used: json().default([]),
    start_date: date(),
    end_date: date(),
    userId: text('user_id')
      .notNull()
      .references(() => usersTable.email, { onDelete: 'cascade' }),
  });

export const projectRelations = relations(project, ({ one }) => ({
	user: one(usersTable, {
		fields: [project.userId],
		references: [usersTable.email],
	}),
}));


export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof workExperience.$inferInsert;
export type SelectPost = typeof workExperience.$inferSelect;

export type InsertExtraCurricular = typeof workExperience.$inferInsert;
export type SelectExtraCurricular = typeof workExperience.$inferSelect;

export type InsertEducation = typeof workExperience.$inferInsert;
export type SelectEducation = typeof workExperience.$inferSelect;

export type InsertWorkExperience = typeof workExperience.$inferInsert;
export type SelectWorkExperience = typeof workExperience.$inferSelect;
