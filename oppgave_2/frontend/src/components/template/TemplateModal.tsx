import React from 'react';

type TemplateModalProps = {
  title: string;
  description?: string;
  price: number;
  capacity?: number;
  isPrivate: boolean;
  onClose: () => void;
};

export default function TemplateModal(props: TemplateModalProps) {
  const { title, description, price, capacity, isPrivate, onClose } = props;

  return (
    <section className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <section className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        {description && <p className="text-gray-700 mb-4">{description}</p>}
        <p className="text-sm mb-2">
          <strong>💸Pris:</strong> {price === 0 ? 'Gratis' : `${price},- kr`}
        </p>
        {capacity !== undefined && (
          <p className="text-sm mb-2">
            <strong>🧍🏻Kapasitet:</strong> {capacity}
          </p>
        )}
        <p className="text-sm mb-4">
          <strong>🔒Privat:</strong> {isPrivate ? 'Ja' : 'Nei'}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Lukk
        </button>
      </section>
    </section>
  );
}
