   import { courseRepository } from "@/features/courses/courses.repository";
   import { courses, comments } from "@/data/data";
import db from "./db";

export const seedDatabase = async () => {
   // Seed courses
   for (const courseData of courses) {
      const existingCourse = await courseRepository.getCourseBySlug(courseData.slug);

      // Hvis kurset allerede finnes, går vi videre
      if (existingCourse.success) {
         console.log(
            `Course with slug "${courseData.slug}" already exists. Skipping...`
         );
         continue;
      }

      // Hvis kurset ikke finnes, opprett det
      const createResult = await courseRepository.create(courseData);
      if (!createResult.success) {
         console.error(
            `Failed to create course "${courseData.title}":`,
            createResult.error
         );
      } else {
         console.log(`Successfully created course "${courseData.title}".`);
      }
   }

   // Seed comments
   // Eksempel kode for seeding av kommentarer etter at kurs og leksjoner er lagt til
   for (const comment of comments) {
      const lessonSlug = comment.lesson.slug;
      const lessonRow = db.prepare("SELECT * FROM Lesson WHERE slug = ?").get(lessonSlug);

      if (lessonRow) {
         // Leksjonen finnes, vi kan legge til kommentaren
         const commentData = {
            id: comment.id,
            createdBy: JSON.stringify(comment.createdBy),
            comment: comment.comment,
            lesson_slug: lessonSlug,
         };

         try {
            db.prepare(`
        INSERT INTO Comment (id, lesson_slug, created_by, comment)
        VALUES (?, ?, ?, ?)
      `).run(
               commentData.id,
               commentData.lesson_slug,
               commentData.createdBy,
               commentData.comment
            );
            console.log(`Successfully created comment by "${comment.createdBy.name}".`);
         } catch (error) {
            console.error(`Failed to create comment by "${comment.createdBy.name}". Error: ${error}`);
         }
      } else {
         // Leksjonen finnes ikke, hopp over kommentaren
         console.warn(`Lesson with slug "${lessonSlug}" not found for comment by "${comment.createdBy.name}". Skipping...`);
      }
   }

   };

   // seedDatabase()
   // .then(() => {
   //    console.log("Database seeding complete.");
   // })
   // .catch((error) => {
   //    console.error("Database seeding failed:", error);
   // });
