import { useState } from "react";

type CommentFormProps = {
  onSubmit: (commentData: { name: string; comment: string }) => void;
};

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (!name || !comment) {
      setFormError(true);
    } else {
      onSubmit({ name, comment });
      setSuccess(true);
      setName("");
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label className="mb-4 flex flex-col">
        <span className="mb-1 text-sm font-semibold">Navn*</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded bg-slate-100"
        />
      </label>
      <label className="mb-4 flex flex-col">
        <span className="mb-1 text-sm font-semibold">Legg til kommentar*</span>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded bg-slate-100"
          cols={30}
        />
      </label>
      <button
        type="submit"
        className="rounded bg-emerald-600 px-10 py-2 text-base text-white"
      >
        Legg til kommentar
      </button>
      {formError && <p className="text-red-500">Fyll ut alle felter med *</p>}
      {success && <p className="text-emerald-500">Skjema sendt</p>}
    </form>
  );
};

export default CommentForm;
