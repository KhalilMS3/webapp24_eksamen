import { Hono } from "hono";
import { cors } from "hono/cors";
import EventController from "./features/events/event.controller";
import BookingController from "./features/bookings/booking.controller";
import ParticipantController from "./features/participants/participant.controller";
import TemplateController from "./features/templates/template.controller";

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

app.route('/api/events', EventController)
app.route('/api/bookings', BookingController)
app.route('/api/participants', ParticipantController)
app.route('/api/templates', TemplateController)
export default app;
