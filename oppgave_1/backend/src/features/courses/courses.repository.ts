import { Result } from "@/types"
import { Comment, CommentSchema, commentToDB, Course, CourseDB, courseFromDB, courseToDB, Lesson, lessonFromDB, lessonToDB } from "./courses.schema"

import { validateCourse, validateLesson } from "./courses.services"
import db from "@/db/db"
import { randomUUID } from "crypto"

type CourseRepository = {
   list: () => Promise<Result<Course[]>>,
   create: (data: Course) => Promise<Result<Course>>,
   createComment: (lessonSlug: string, commentData: { createdBy: { id: string; name: string }; comment: string }) => Promise<Result<Comment>>
   getCourseBySlug: (slug: string) => Promise<Result<Course>>,
   getLessonBySlug: (courseSlug: string, lessonSlug: string) => Promise<Result<Lesson>>;
   update: (slug: string, data: { category: string }) => Promise<Result<Course>>,
   delete: (slug: string) => Promise <Result<null>>
}

export const createCourseRepository = (db: any): CourseRepository => {
   return {
      list: async (): Promise<Result<Course[]>> => {
         try {
            const rows = db.prepare(`SELECT id, title, slug, description, category FROM Course`).all();
            const courses = rows.map((row: CourseDB) => ({
               ...row,
               lessons: [], // Leksjoner i  tom liste da vi ikke trenger leksjoner ved listing av kursene
            }));
            return { success: true, data: courses };
         } catch (error) {
            console.error(error)
            return { success: false, error: { code: "500", message: `Failed to get courses from Database: ${error}` } }
         }
      },
      create: async (data: Course): Promise<Result<Course>> => {
         const validatedCourseResult = validateCourse(data)
         if (!validatedCourseResult.success) {
            return {
               success: false,
               error: { code: "400", message: `validation Error ${validatedCourseResult.error}` }
            }
         }
         try {
            const dbTransaction = db.transaction(() => {
               const createdCourse: CourseDB = courseToDB({...data, id: randomUUID()})
               db.prepare(
                  `
                  INSERT INTO Course (id, title, slug, description, category)
                  VALUES(?, ?, ?, ?, ?)
                  `
               ).run(
                  createdCourse.id,
                  createdCourse.title,
                  createdCourse.slug,
                  createdCourse.description,
                  createdCourse.category
               )
               if (data.lessons) {
                  data.lessons.forEach((lesson) => {

                     const validatedLessonResult = validateLesson(lesson)
                     if (!validatedLessonResult.success) {
                        return {
                           success: false,
                           error: {code: 400, message: `Lesson validation failed ${validatedLessonResult.error}`}
                        }
                     }
                     const createdLesson = lessonToDB({...lesson, id: randomUUID()})
                     db.prepare(
                        `
                        INSERT INTO Lesson (id, course_id, title, slug, description, text)
                        VALUES  (?, ?, ?, ?, ?, ?)
                        `
                     ).run(
                        createdLesson.id,
                        createdCourse.id,
                        createdLesson.title,
                        createdLesson.slug,
                        createdLesson.preAmble,
                        JSON.stringify(createdLesson.text)
                     )
                  })
               }
            })
            dbTransaction()
            return{success: true, data}
         } catch (error) {
            console.error(error)
            return {
               success: false, error: {
                  code: "500",
                  message: "Failed to create a course"
            }}
         }
      },
      createComment: async (lessonSlug: string, commentData: { createdBy: { id: string; name: string }, comment: string }): Promise<Result<Comment>> => {
      try {
         const createdComment: Comment = {
            id: randomUUID(),
            createdBy: {
               id: commentData.createdBy.id,
               name: commentData.createdBy.name
            },
            comment: commentData.comment,
            lesson: {slug: lessonSlug,},
         }
         
         const validateCommentResult = CommentSchema.safeParse(createdComment)

         if (!validateCommentResult.success) {
            console.error("Validation error:", validateCommentResult.error)
            return {
               success: false,
               error: {
                  code: "400",
                  message: `Validation of comment failed: ${validateCommentResult.error}`
               }
            }

         }
         const createdCommentDB = commentToDB(createdComment)
         
         db.prepare(`
            INSERT INTO Comment (id, lesson_slug, created_by, comment)
            VALUES (?, ?, ?, ?)
            `).run(
               createdCommentDB.id,
               createdCommentDB.lesson.slug,
               createdCommentDB.createdBy.id,
               createdCommentDB.comment,
         )
         
         return {success: true, data: createdComment}
      } catch (error) {
         return {
            success: false,
            error: {
               code: "400",
               message: "Failed to create comment"
            }
      }
      } 
      },
      getCourseBySlug: async (slug: string): Promise<Result<Course>> => {
         try {
            const courseRow = db.prepare(`SELECT * FROM Course WHERE slug = ?`).get(slug)
            if (courseRow) {
               const lessonsRows = db.prepare("SELECT * FROM Lesson WHERE course_id = ?").all(courseRow.id);
               const lessons = lessonsRows.map((lessonRow: any) => lessonFromDB(lessonRow));

               const course = {
                  ...courseFromDB(courseRow),
                  lessons
               }
               return{success: true, data: course}
            } else {
               return {
                  success: false, error: {
                     code: "404",
                     message: "Course Not Found"
               } }
            }
         } catch (error) {
            return {
               success: false, error: {
                  code: "400",
                  message: "Faild to get course"
               }
            }
         }
      },
      getLessonBySlug: async (courseSlug: string, lessonSlug: string): Promise<Result<Lesson>> => {
         try {
            const course = await courseRepository.getCourseBySlug(courseSlug)
            if (!course.success || !course.data) {
               return { success: false, error: { code: '404', message: 'Course not found' } }
            }
            const lessonRow = db.prepare(`
               SELECT * FROM Lesson WHERE slug = ? AND course_id = ?
               `).get(lessonSlug, course.data.id)
            
            if (!lessonRow) {
               return { success: false, error: { code: '404', message: 'Lesson not found' } }
            }

            const commentsRows = db.prepare(`
               SELECT * FROM Comment WHERE lesson_slug = ?
               `).all(lessonRow.slug)
            
            const comments = commentsRows.map((commentRow: any) => ({
                  id: commentRow.id,
                  createdBy: {
                     id: commentRow.created_by.id,
                     name: commentRow.created_by.name,
                  },
                  comment: commentRow.comment,
                     lesson: {
                     slug: lessonSlug
                  }
            }))
            const lessonWithComments: Lesson = {
               ...lessonFromDB(lessonRow),
               comments,
               
            }
            return { success: true, data: lessonWithComments };
         } catch (error) {
            console.error('Failed to fetch lesson and comments:', error);
            return { success: false, error: { code: '500', message: 'Failed to fetch lesson and comments' } };
      
         }
      },
      update: async (slug: string, data: { category: string }): Promise<Result<Course>> => {
         try {
            const existingCourse = await courseRepository.getCourseBySlug(slug)
            if (!existingCourse.success || !existingCourse.data) {
               return existingCourse
            }

            const updatedCourse = { ...existingCourse.data, category: data.category }
            const updatedCourseToSave: CourseDB = courseToDB(updatedCourse)

            db.prepare(`
               UPDATE Course SET category = ? WHERE slug = ?
               `).run(
                  updatedCourseToSave.category,
                  slug
            )
            
            return {success: true, data: updatedCourse}
         } catch (error) {
            return {
               success: false, error: {
                  code: "400",
                  message: "Faild to update course"
               }
            }
         }
      },
      delete: async (slug: string): Promise<Result<null>> => {
         try {
            db.prepare(`
               DELETE FROM Course WHERE slug = ?
               `).run(slug)
         return {success: true, data: null}
         } catch (error) {
            return {
               success: false, 
               error: {
                  code: "500",
                  message: "Failed to delete course"
               }
            }
         }
      }      
      
   }
}

export const courseRepository = createCourseRepository(db)
