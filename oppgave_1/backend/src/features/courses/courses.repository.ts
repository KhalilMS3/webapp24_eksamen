import { Result } from "@/types"
import { Course, CourseDB, courseFromDB, courseToDB, Lesson, lessonFromDB, lessonToDB } from "./courses.schema"
import db from "@/db/db"

type CourseRepository = {
   list: () => Promise<Result<Course[]>>,
   create: (data: Course) => Promise<Result<Course>>,
   getBySlug: (slug: string) => Promise<Result<Course>>,
   update: (slug: string, data:{category: string}) => Promise<Result<Course>>,
   delete: (slug: string) => Promise <Result<null>>
}

export const createCourseRepository = (db: any): CourseRepository => {
   return {
      list: async (): Promise<Result<Course[]>> => {
         try {
            const rows = db.prepare("SELECT id, title, slug, description, category FROM Course").all();
         const courses = rows.map((row: CourseDB) => ({
            ...row,
          lessons: [], // Leksjoner i  tom liste da vi ikke trenger leksjoner ved listing av kursene
         }));
         return { success: true, data: courses };
         } catch (error) {
            console.error(error)
            return { success: false, error: { code: "500", message: `Failed to get courses from Database: ${error}`} }
         }
      },
      create: async (data: Course): Promise<Result<Course>> => {
         try {
            const dbTransaction = db.transaction(() => {
               const createdCourse: CourseDB = courseToDB(data)
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
                     const createdLesson = lessonToDB(lesson)
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
      getBySlug: async (slug: string): Promise<Result<Course>> => {
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
      update: async (slug: string, data: { category: string }): Promise<Result<Course>> => {
         try {
            const existingCourse = await courseRepository.getBySlug(slug)
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
