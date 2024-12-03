import { Hono } from "hono";
import { TemplateService } from "./template.service";


const TemplateController = new Hono();

TemplateController.get("/", async (c: any) => {
    const result = await TemplateService.listTemplates();

    if (!result.success) {
        return c.json({ success: false, error: result.error.message }, 500);
    }
    return c.json(result.data, 200);
});

TemplateController.get("/:id", async (c: any) => {
    const id = c.req.param("id");

    const result = await TemplateService.getTemplateById(id);
    if (!result.success) {
        return c.json({ success: false, error: result.error.message }, 404);
    }
    return c.json({ success: true, data: result.data }, 200);
});
TemplateController.get("/:id/in-use", async (c: any) => {
    const id = c.req.param("id");
    try {
        const result = await TemplateService.isTemplateInUse(id);
        return c.json({ success: true, inUse: result }, 200);
    } catch (error) {
        console.error("Error checking if template is in use: ", error)
        return c.json({ success: false, error: "Failed to check if template is in use" }, 500)
    }
});

TemplateController.post("/", async (c: any) => {
    try {
        const body = await c.req.json();
        console.log("Received template data:", body);

        const response = await TemplateService.createTemplate(body);

        if (!response.success) {
            return c.json({ success: false, error: response.error.message }, 400);
        }
        return c.json({ success: true, data: response.data }, 201);
    } catch (error) {
        console.error("Error creating template:", error);
        return c.json({ success: false, error: "Failed to create template" }, 500);
    }
});

TemplateController.patch("/:id", async (c: any) => {
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        console.log("Received update data:", body);

        const response = await TemplateService.updateTemplate(id, body);

        if (!response.success) {
            return c.json({ success: false, error: response.error.message }, 400);
        }
        return c.json({ success: true, data: response.data }, 200);
    } catch (error) {
        console.error("Error updating template:", error);
        return c.json({ success: false, error: "Failed to update template" }, 500);
    }
});

TemplateController.delete("/:id", async (c: any) => {
    try {
        const id = c.req.param("id");
        const response = await TemplateService.deleteTemplate(id);

        if (!response.success) {
            return c.json({ success: false, error: response.error.message }, 404);
        }
        return c.json({ success: true, message: "Template deleted successfully!" }, 200);
    } catch (error) {
        console.error("Error deleting template:", error);
        return c.json({ success: false, error: "Failed to delete template" }, 500);
    }
});

export default TemplateController;
