"use client";
import useTemplate from "@/hooks/useTemplate";
import React, { useCallback, useState } from "react";
import TemplateCard from "./TemplateCard";
import { Template } from "@/types/types";
import { API_BASE } from "@/config/urls";
import EditTemplateModal from "./EditTemplateModal";

export default function Templates() {
  const { templates, loading, error } = useTemplate();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [localTemplates, setLocalTemplates] = useState<Template[]>(templates);

  const handleEdit = useCallback((template: Template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (templateId: string) => {
    try {
      const response = await fetch(`${API_BASE}/templates/${templateId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLocalTemplates((prev) =>
          prev.filter((template) => template.id !== templateId)
        );
      } else {
        console.error("Feil ved sletting av mal 🫤");
      }
    } catch (error) {
      console.error("Error deleting template: ", error);
    }
  }, []);

  const handleModalClose = () => {
    setSelectedTemplate(null);
    setIsEditModalOpen(false);
  };
  return (
    <section className="p-10">
      <h2 className="text-3xl mb-10 font-semibold">Maler</h2>
      {loading ? (
        <p>Laster inn malene...</p>
      ) : error ? (
        <p>
          Det oppstod en feil ved lasting av malene 🫤 <br /> {error}
        </p>
      ) : templates.length > 0 ? (
        <section className="flex flex-wrap justify-items-stretch gap-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              title={template.title}
              description={template.description}
              price={template.price}
              capacity={template.capacity}
              isPrivate={template.is_private}
              no_overlapping_event={template.no_overlapping_events}
              date_locked={template.date_locked}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      ) : (
        !loading && <p>Ingen maler funnet 🙁</p>
      )}
      {selectedTemplate && (
        <EditTemplateModal
          template={selectedTemplate}
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          onUpdate={(updatedTemplate) => {
            const updatedTemplates = localTemplates.map((template) =>
              template.id === updatedTemplate.id ? updatedTemplate : template
            );
            setLocalTemplates(updatedTemplates);
          }}
        />
      )}
    </section>
  );
}
