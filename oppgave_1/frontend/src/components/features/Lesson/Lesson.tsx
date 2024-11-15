"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { CommentType } from "@/types";
import CourseLayout from "@/components/layout/CourseLayout";
import useLessonDetails from "@/hooks/useLessonDetails";

export default function Lesson() {
  const params = useParams() as Record<string, string>;
  const { courseSlug, lessonSlug } = params;
  const {lesson, courseTitle, courseCategory, loading, error} = useLessonDetails(courseSlug, lessonSlug)
  const [success, setSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (loading) {
    return <p>Laster inn leksjon...</p>;
  }

  if (error) {
    return <p>Kunne ikke hente leksjon: {error}</p>;
  }

  return (
    <CourseLayout>
    <div>
      <div className="flex justify-between">
        <h3 data-testid="course_title" className="mb-6 text-base font-bold">
          <a className="underline" href={`/courses/${courseSlug}`}>
            {courseTitle}
          </a>
        </h3>
        <span data-testid="course_category">
          Kategori: <span className="font-bold">{courseCategory}</span>
        </span>
      </div>
      <h2 className="text-2xl font-bold" data-testid="lesson_title">
        {lesson?.title}
      </h2>
      <p
        data-testid="lesson_preAmble"
        className="mt-4 font-semibold leading-relaxed"
        >
        {lesson?.preAmble}
      </p>
      {lesson?.text &&
        lesson.text.length > 0 &&
        lesson.text.map((text) => (
          <p
          data-testid="lesson_text"
          className="mt-4 font-normal"
          key={text.id}
          >
            {text.text}
          </p>
        ))}
      {/* Kommentarseksjon */}
      <section data-testid="comments">
        <h4 className="mt-8 mb-4 text-lg font-bold">
          Kommentarer ({lesson?.comments.length})
        </h4>
        <form
          data-testid="comment_form"
          onSubmit={(e) => {
            e.preventDefault();
            setFormError(!name || !comment);
            setSuccess(!!name && !!comment);
          }}
          noValidate
          >
          <label className="mb-4 flex flex-col" htmlFor="name">
            <span className="mb-1 text-sm font-semibold">Navn*</span>
            <input
              data-testid="form_name"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleName}
              className="w-full rounded bg-slate-100"
              />
          </label>
          <label className="mb-4 flex flex-col" htmlFor="comment">
            <span className="mb-1 text-sm font-semibold">
              Legg til kommentar*
            </span>
            <textarea
              data-testid="form_textarea"
              name="comment"
              id="comment"
              value={comment}
              onChange={handleComment}
              className="w-full rounded bg-slate-100"
            />
          </label>
          <button
            className="rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
            data-testid="form_submit"
            type="submit"
            >
            Legg til kommentar
          </button>
          {formError && (
            <p className="font-semibold text-red-500" data-testid="form_error">
              Fyll ut alle felter med *
            </p>
          )}
          {success && (
            <p
            className="font-semibold text-emerald-500"
            data-testid="form_success"
            >
              Skjema sendt
            </p>
          )}
        </form>
        <ul className="mt-8" data-testid="comments_list">
          {lesson?.comments?.map((comment: any) => (
            <li
            className="mb-6 rounded border border-slate-200 px-4 py-6"
            key={comment.id}
            >
              <h5 data-testid="user_comment_name" className="font-bold">
                {comment.createdBy.name}
              </h5>
              <p data-testid="user_comment">{comment.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
    </CourseLayout>
  );
}
