import { z } from "zod";
import {
  CourseSchema,
  CourseSchemaDB,
  LessonSchema,
  LessonSchemaDB,
} from "./courses.schema";

export const validateCourse = (course: unknown) => {
  const result = CourseSchema.safeParse(course);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
};

export const validateCourseDB = (course: unknown) => {
  const result = CourseSchemaDB.safeParse(course);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
};

export const validateLesson = (lesson: unknown) => {
  const result = LessonSchema.safeParse(lesson);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
};

export const validateLessonDB = (lesson: unknown) => {
  const result = LessonSchemaDB.safeParse(lesson);
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, error: result.error };
  }
};
