import { Result } from "@/types";
import { Template, templateSchema, templateToDB } from "./template.schema";
import { TemplateRepository } from "./template.repository";
import { z } from "zod";
import { randomUUID } from "crypto";

class createTemplateService {
   async listTemplates(): Promise<Result<Template[]>>{
      return await TemplateRepository.listTemplates()
   }
   async getTemplateById(id: string): Promise<Result<Template>>{
      if (!id) {
         return {
            success: false,
            error: {
               code: "404",
               message: "Invalid template ID"
            }
         }
      }
      return await TemplateRepository.getTemplateById(id)
   }
   async createTemplate(data: any): Promise<Result<Template>>{
      try {
         if (!data.id) {
            data.id = randomUUID()
         }
         const parsedTemplateData = templateSchema.parse(data)
         return await TemplateRepository.createTemplate(parsedTemplateData)
      } catch (error) {
         if (error instanceof z.ZodError) {
            return {
               success: false,
               error: {
                  code: "400",
                  message: JSON.stringify(error.errors)
               }
            }
         } else {
            return {
               success: false,
               error: {
                  code: "500",
                  message: `Failed to create template: ${error}`
               }
            }
         }
      }
   }
   async updateTemplate(id: string, data: any): Promise<Result<Template>> {
        try {
            const parsedData = templateSchema.parse(data);
            return await TemplateRepository.updateTemplate(id, parsedData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    error: {
                        code: "400",
                        message: JSON.stringify(error.errors),
                    },
                };
            } else {
                return {
                    success: false,
                    error: { code: "500", message: `Failed to update template: ${error}` },
                };
            }
        }
    }

    async deleteTemplate(id: string): Promise<Result<null>> {
        if (!id) {
            return {
                success: false,
                error: { code: "400", message: "Invalid template ID" },
            };
        }
        return await TemplateRepository.deleteTemplate(id);
    }
}

export const TemplateService = new createTemplateService();
