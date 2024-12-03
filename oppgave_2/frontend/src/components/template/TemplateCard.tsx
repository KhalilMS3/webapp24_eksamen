import React, { useEffect, useState } from "react";
import TemplateModal from "./TemplateModal";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/config/urls";

type TemplateCardProps = {
  id: string;
  title: string;
  description?: string;
  price: number;
  capacity?: number;
  isPrivate: boolean;
  no_overlapping_event: boolean;
  date_locked?: string[];
  onEdit: (template: any) => void;
  onDelete: (id: string) => void;
};

export default function TemplateCard(props: TemplateCardProps) {
  const {
    id,
    title,
    description,
    price,
    capacity,
    isPrivate,
    date_locked,
    no_overlapping_event,
    onEdit,
    onDelete,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTemplateInUse, setIsTemplateInUse] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkTemplateInUse = async () => {
      try {
        const response = await fetch(`${API_BASE}/templates/${id}/in-use`);
        const data = await response.json();
        setIsTemplateInUse(data.inUse);
      } catch (error) {
        console.error("Error checking if template is in use: ", error);
      }
    };
    checkTemplateInUse();
  }, [id]);

  const handleInspectClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateEventClick = () => {
    router.push(`maler/opprette-arrangement-fra-mal/${id}`);
  };

  return (
    <article className="flex flex-col p-5 gap-3 w-3/12 border-black border rounded-md shadow-md hover:shadow-lg cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-700 mb-4">{description}</p>}
      <section className="flex gap-5">
        <button
          onClick={handleCreateEventClick}
          className="px-4 py-2 bg-green-500 w-full text-white rounded-md hover:bg-green-600"
        >
          Opprett arrangement
        </button>
      </section>
      {isModalOpen && (
        <TemplateModal
          title={title}
          description={description}
          price={price}
          capacity={capacity}
          isPrivate={isPrivate}
          no_overlapping_event={no_overlapping_event}
          date_locked={date_locked}
          onClose={handleModalClose}
        />
      )}
      <section className="flex justify-between w-full gap-5">
        <button
          onClick={handleInspectClick}
          className="px-4 py-2 grow bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Inspiser mal
        </button>
        <button
          disabled={isTemplateInUse}
          onClick={() => onEdit(props)}
          className={`px-4 py-2 rounded ${
            isTemplateInUse
              ? "bg-gray-400 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {isTemplateInUse ? "Rediger: Mal i bruk" : "Rediger"}
        </button>
        <button
          disabled={isTemplateInUse}
          onClick={() => onDelete(id)}
          className={`px-4 py-2 rounded ${
            isTemplateInUse ? "bg-gray-400 text-white" : "bg-red-600 text-white"
          }`}
        >
          {isTemplateInUse ? "Slett: Mal i bruk" : "Slett"}
        </button>
      </section>
    </article>
  );
}
