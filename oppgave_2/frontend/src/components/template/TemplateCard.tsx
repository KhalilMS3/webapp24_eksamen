import React, { useState } from 'react'
import TemplateModal from './TemplateModal'
import { useRouter } from 'next/navigation'

type TemplateCardProps = {
   id: string;
   title: string,
   description?: string,
   price: number,
   capacity?: number,
   isPrivate: boolean

}
export default function TemplateCard(props: TemplateCardProps) {
   const { id, title, description, price, capacity, isPrivate } = props
   const [isModalOpen, setIsModalOpen] = useState<boolean>()
   const router = useRouter()
   
   const handleInspectClick = () => {
     setIsModalOpen(true);
   };
   const handleModalClose = () => {
     setIsModalOpen(false);
   };

   const handleCreateEventClick = () => {
      router.push(`maler/opprette-arrangement-fra-mal/${id}`)
   }
  return (
    <article className="flex flex-col p-5 gap-3 w-3/12 border-black border rounded-md shadow-md hover:shadow-lg cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-700 mb-4">{description}</p>}
      <section className="flex gap-10">
        <p className="text-sm mb-2">
          <strong>💸Pris:</strong> {price === 0 ? "Gratis" : `${price},- kr`}
        </p>
        {capacity !== undefined && (
          <p className="text-sm mb-2">
            <strong>🧍🏻Kapasitet:</strong> {capacity}
          </p>
        )}
        <p className="text-sm mb-2">
          <strong>🔒Privat:</strong> {isPrivate ? "Ja" : "Nei"}
        </p>
        </section>
        <section className='flex justify-around gap-5'>
           
      <button
        onClick={handleInspectClick}
        className="px-4 py-2 grow bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
        Inspiser mal
      </button>
      <button
        onClick={handleCreateEventClick}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
            onClose={handleModalClose}
        />
      )}
    </article>
  );
}
