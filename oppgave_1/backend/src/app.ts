import { Hono } from "hono";
import { cors } from "hono/cors";
import { courseRepository } from "./features/courses/courses.repository";
import { validateCourse } from "./features/courses/courses.services";

const app = new Hono();

app.use("/*", cors());

app.get('/api/courses', async (c) => {
  const updatedCourse = await courseRepository.list()
  if (updatedCourse.success) {
    return c.json(updatedCourse.data, 200)
  } else {
    return c.json({error: updatedCourse.error}, 500)
  }
})

app.get('/api/courses/:courseSlug', async (c) => {
  const courseSlug = c.req.param('courseSlug')
  const updatedCourse = await courseRepository.getCourseBySlug(courseSlug)
  if (updatedCourse.success){
    return c.json(updatedCourse.data, 200)
  } else {
    return c.json({ error: updatedCourse.error }, 500)
  }
})
app.get('/api/courses/:courseSlug/:lessonSlug', async (c) => { 

  const courseSlug = c.req.param('courseSlug')
  const lessonSlug = c.req.param('lessonSlug')
  const lessonupdatedCourse = await courseRepository.getLessonBySlug(courseSlug, lessonSlug)
  if (!lessonupdatedCourse.success) {
    return c.json({success: false, error: lessonupdatedCourse.error}, 404)
  }
  return c.json({success: true, data: lessonupdatedCourse.data}, 200)
})

app.post('/api/courses', async (c) => {
  try {
    const courseBody = await c.req.json()
    const validateCourseupdatedCourse = validateCourse(courseBody)

    if (!validateCourseupdatedCourse.success) {
      return c.json({error: validateCourseupdatedCourse.error}, 400)
    }
    const updatedCourse = await courseRepository.create(courseBody)
    if (updatedCourse.success) {
      return c.json(updatedCourse.data, 201)
    } else {
      return c.json({error: updatedCourse.error}, 400)
    }
  } catch (error) {
    return c.json({error: "invalid body format"}, 400)
  }
})

app.patch('/api/courses/:courseSlug', async (c) => {
  const courseSlug = c.req.param('courseSlug')
  const { category } = await c.req.json()
  try {
    if (!category) {
      return c.json({error: "Category required"}, 400)
    }
    const updatedCourse = await courseRepository.update(courseSlug, { category })
    if (updatedCourse.success) {
      return c.json(updatedCourse.data, 200)
    } else {
      return c.json({error: updatedCourse.error}, 400)
    }
  } catch (error) {
      return c.json({error: "invalid data"}, 400)
  }
})

app.delete('/api/courses/:courseSlug', async (c) => {
  const courseSlug = c.req.param('courseSlug')
  const deleteCourse = await courseRepository.delete(courseSlug)

  if (deleteCourse.success) {
    return c.json({message: "Course deleted successfully"}, 200)
  } else {
    return c.json({message: "Course not found"}, 404) 
  }
})


app.onError((err, c) => {
  console.error(err);
  
  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
