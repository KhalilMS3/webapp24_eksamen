import { z } from "zod";


export const LessonSchema = z.object({
   id: z.string(),
   title: z.string().min(1, "title required"),
   slug: z.string().min(1, "slug required"),
   preAmble: z.string().optional(),
   text: z.array(z.object({
      id: z.string(),
      text: z.string().min(1, "text can't be empty")
   }))
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

export type Course = z.infer<typeof CourseSchema>
export type Lesson = z.infer<typeof LessonSchema>
export type Comment = z.infer<typeof CommentSchema>


