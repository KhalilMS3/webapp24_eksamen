import { Hono } from "hono";
import { cors } from "hono/cors";
import { courseRepository } from "./features/courses/courses.repository";
import { error } from "console";
import { validateCourse } from "./features/courses/courses.services";

const app = new Hono();

app.use("/*", cors());

app.get('/api/courses', async (c) => {
  const result = await courseRepository.list()
  if (result.success) {
    return c.json(result.data, 200)
  } else {
    return c.json({error: result.error}, 500)
  }
})

app.get('/api/courses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const result = await courseRepository.getBySlug(slug)
  if (result.success){
    return c.json(result.data, 200)
  } else {
    return c.json({ error: result.error }, 500)
  }
})

app.post('/api/courses', async (c) => {
  try {
    const courseBody = await c.req.json()
    const validateCourseResult = validateCourse(courseBody)

    if (!validateCourseResult.success) {
      return c.json({error: validateCourseResult.error}, 400)
    }
    const result = await courseRepository.create(courseBody)
    if (result.success) {
      return c.json(result.data, 201)
    } else {
      return c.json({error: result.error}, 400)
    }
  } catch (error) {
    return c.json({error: "invalid body format"}, 400)
  }
})

app.patch('/api/courses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const { category } = await c.req.json()
  try {
    if (!category) {
      return c.json({error: "Category required"}, 400)
    }
    const result = await courseRepository.update(slug, { category })
    if (result.success) {
      return c.json(result.data, 200)
    } else {
      return c.json({error: result.error}, 400)
    }
  } catch (error) {
      return c.json({error: "invalid data"}, 400)
  }
})

app.delete('/api/courses/:slug', async (c) => {
  const slug = c.req.param('slug')
  const result = await courseRepository.delete(slug)

  if (result.success) {
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
