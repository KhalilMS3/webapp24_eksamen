import { z } from "zod";

export const CommentSchema = z.object({
   id: z.string(),
   createdBy: z.object({
      id: z.string(),
      name: z.string().min(1, "Name required"),
   }),
   comment: z.string().min(1, "Comment can't be empty"),
   lesson: z.object({
      slug: z.string()
   }),
})

export const LessonSchema = z.object({
   id: z.string(),
   title: z.string().min(1, "title required"),
   slug: z.string().min(1, "slug required"),
   preAmble: z.string().optional(),
   text: z.array(z.object({
      id: z.string(),
      text: z.string().min(1, "text can't be empty")
   })),
   comments: z.array(CommentSchema).optional()
})

export const CourseSchema = z.object({
   id: z.string(),
   title: z.string().min(1, "title required"),
   slug: z.string().min(1, "slug required"),
   description: z.string().min(1, "description required"),
   category: z.string().min(1, "category required"),
   lessons: z.array(LessonSchema)
})

export const CourseSchemaDB = CourseSchema.extend({
   lessons: z.string()
})
export const LessonSchemaDB = LessonSchema.extend({
   text: z.string()
})



export type Course = z.infer<typeof CourseSchema>
export type CourseDB = z.infer<typeof CourseSchemaDB>
export type Lesson = z.infer<typeof LessonSchema>
export type LessonDB = z.infer<typeof LessonSchemaDB>
export type Comment = z.infer<typeof CommentSchema>


// Convert course form original course form to data base form 
export const courseToDB = (course: z.infer<typeof CourseSchema>): z.infer<typeof CourseSchemaDB> => {
   return {
      ...course,
      lessons: JSON.stringify(course.lessons ?? [])
   }
}

// Convert course from to data base to original course form
export const courseFromDB = (course: z.infer<typeof CourseSchemaDB>): z.infer<typeof CourseSchema> => {
   return {
      ...course,
      lessons: JSON.parse(course.lessons || "[]")
   }
}

export const lessonToDB = (lesson: z.infer<typeof LessonSchema>): z.infer<typeof LessonSchemaDB> => {
   return {
      ...lesson,
      text: JSON.stringify(lesson.text)
   }
}


export const lessonFromDB = (lesson: z.infer<typeof LessonSchemaDB>): z.infer<typeof LessonSchema> => {
   return {
      ...lesson,
      text: JSON.parse(lesson.text)
   }
}

export const commentToDB = (comment: Comment): any => {
   return {
      id: comment.id,
      lesson_slug: comment.lesson.slug,
      created_by: comment.createdBy.id,
      comment: comment.comment,
   };
};

export const commentFromDB = (commentDB: any): Comment => {
   return {
      id: commentDB.id,
      createdBy: {
      id: commentDB.created_by,
      name: "",
   },
      comment: commentDB.comment,
      lesson: {
      slug: commentDB.lesson_slug,
      },
   };
};

// validate data before saving to db
export const validateCourse = (course: unknown) => {
   const result = CourseSchema.safeParse(course)
   if (result.success) {
      return {success: true, data: result.data}
   } else {
      return {success: false, error: result.error}
   }
   
}

// validate data before retrieving from db
export const validateCourseDB = (course: unknown) => {
   const result = CourseSchemaDB.safeParse(course)
   if (result.success) {
      return {success: true, data: result.data}
   } else {
      return {success: false, error: result.error}
   }
   
}