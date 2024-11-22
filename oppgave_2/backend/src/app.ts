import { Hono } from "hono";
import { cors } from "hono/cors";
import EventController from "./features/events/event.controller";

const app = new Hono();

app.use("/*", cors());

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

app.route('/api', EventController)
export default app;
