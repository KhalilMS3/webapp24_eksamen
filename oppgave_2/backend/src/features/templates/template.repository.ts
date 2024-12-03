import { Result } from "@/types"
import { Template, templateFromDB, templateToDB } from "./template.schema"
import db from "@/db/db"

type TemplateRepository = {
   listTemplates: () => Promise<Result<Template[]>>
   getTemplateById: (id: string) => Promise<Result<Template>>
   isTemplateInUse: (id: string) => Promise<boolean>
   createTemplate: (data: Template) => Promise<Result<Template>>
   updateTemplate: (id: string, data: Template) => Promise<Result<Template>>
   deleteTemplate: (id: string) => Promise<Result<null>>
}

export const createTemplateRepository = (db: any): TemplateRepository => {
   return {
      listTemplates: async (): Promise<Result<Template[]>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM templates
               `)
            const rows = stmt.all()
            const templates = rows.map(templateFromDB)
            return{success: true, data: templates}
         } catch (error: any) {
            console.error("Error listing templates from database:", error)
            return{success: false, error: error.message}
         }
      },
      isTemplateInUse: async (id: string): Promise<boolean> => {
         // ChatGPT - simplified query logic to check if template is in use
         const stmt = db.prepare(`SELECT COUNT(*) AS count FROM events WHERE template_id = ?`);
         const result = stmt.get(id);
         return result.count > 0;
      },
      getTemplateById: async (id: string): Promise<Result<Template>> => {
         try {
            const stmt = db.prepare(`
               SELECT * FROM templates 
               WHERE id = ?
               `)
            
            const row = stmt.get(id)
            if (!row) {
               return {
                  success: false,
                  error: {
                     code: "404",
                     message: "Template not found",
                  }
               }
            }
            const template = templateFromDB(row)
            return{success: true, data: template}
         } catch (error: any) {
            console.error("Error listing template by ID from database:", error)
            return{success: false, error: error.message}
         }
      },

      createTemplate: async (data: Template): Promise<Result<Template>> => {
         try {
            const templateData = templateToDB(data)
            if (!data.created_at) {
               data.created_at = new Date().toISOString()
            }
            const stmt = db.prepare(`
               INSERT INTO templates (
                        id, title, description, date_locked, no_overlapping_events,
                        is_private, capacity, price, has_waitlist, created_at
               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
               `)
            stmt.run(
               templateData.id,
               templateData.title,
               templateData.description,
               templateData.date_locked,
               templateData.no_overlapping_events,
               templateData.is_private,
               templateData.capacity,
               templateData.price,
               templateData.has_waitlist,
               templateData.created_at
            )
            return {success: true, data}
         } catch (error: any) {
            console.error("Error creating template:", error)
            return {success: false, error: error.message}
         }
      },

      updateTemplate: async (id: string, data: Template): Promise<Result<Template>> => {
         try {
            const templateData = templateToDB(data)
            const stmt = db.prepare(`
               UPDATE templates
               SET title = ?, description = ?, date_locked = ?, no_overlapping_events = ?,
                        is_private = ?, capacity = ?, price = ?, has_waitlist = ?, created_at = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?
               `)
            
            stmt.run(
               templateData.title,
               templateData.description,
               templateData.date_locked,
               templateData.no_overlapping_events,
               templateData.is_private,
               templateData.capacity,
               templateData.price,
               templateData.has_waitlist,
               templateData.created_at,
               id
            )
            return{success: true, data}
         } catch (error: any) {
            console.error("Error updating template:", error)
            return {success: false, error: error.message}
         }
      },
      deleteTemplate: async (id: string): Promise<Result<null>> => {
         try {
            
            const stmt = db.prepare(`
               DELETE FROM templates WHERE id = ? 
               `)
               const result = stmt.run(id)
               if (result.changes === 0) {
                  return {
                     success: false,
                     error: {
                        code: "404",
                        message: "Templated not found"
                     }
                  }
               }
               return {success: true, data: null}
         } catch (error: any) {
            console.error("Error deleting template:", error);
            return{success: false, error: error.message}
         }
      }
   }
}

export const TemplateRepository = createTemplateRepository(db)