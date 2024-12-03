"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories, courseCreateSteps } from "@/data/data";
import { Course, Lesson, Lesson as LessonType } from "@/types";
import FormNav from "./FormNav";
import CourseDetailForm from "./CourseDetailForm";
import LessonsAside from "./LessonsAside";
import LessonDetailForm from "./LessonDetailForm";
import FormContentReview from "./FormContentReview";
import { randomUUID } from "crypto";
import useCreateCourse from "@/hooks/useCreateCategory";

export default function CourseForm() {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [current, setCurrent] = useState<number>(0);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [courseFields, setCourseFields] = useState<Course>({
    id: `${randomUUID}`,
    title: "",
    slug: "",
    description: "",
    category: "",
    lessons: [],
  });
  const [lessons, setLessons] = useState<LessonType[]>([]);

  const router = useRouter();
  const { createCourse, loading, error } = useCreateCourse()
  
  const isValid = (items: any): boolean => {
    if (typeof items !== "object" || items === null) {
      return false;
    }
    if (Array.isArray(items)) {
      return items.every((item) => isValid(item));
    }
    return Object.values(items).every((value) =>
      typeof value === "string" ? value.trim() !== "" : isValid(value)
    );
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);

    if (lessons.length > 0 && isValid(lessons) && isValid(courseFields)) {
      setSuccess(true);
      setCurrent(2);
      await createCourse({ ...courseFields, lessons });
      setTimeout(() => {
        router.push("/courses");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  // const addTextBox = () => {
  //   const updatedLessonText = lessons.map((lesson, i) => {
  //     if (currentLesson === i) {
  //       const text = [
  //         { id: `${Math.floor(Math.random() * 1000 + 1)}`, text: "" },
  //       ];
  //       if (lesson.text.length === 0) {
  //         text.push({
  //           id: `${Math.floor(Math.random() * 1000 + 1)}`,
  //           text: "",
  //         });
  //       }
  //       return {
  //         ...lesson,
  //         text: [...lesson.text, ...text],
  //       };
  //     }
  //     return lesson;
  //   });
  //   setLessons(updatedLessonText);
  // };

  // const removeTextBox = (index: number) => {
  //   const removed = lessons[currentLesson].text.filter((_, i) => i !== index);
  //   const updatedLessonText = lessons.map((lesson, i) => {
  //     if (currentLesson === i) {
  //       return {
  //         ...lesson,
  //         text: removed,
  //       };
  //     }
  //     return lesson;
  //   });
  //   setLessons(updatedLessonText);
  // };

  const handleCourseFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setCourseFields((prev) => ({ ...prev, [name]: value }));
    setFormError(false);
  };

  const handleStep = (index: number) => {
    setFormError(false);
    switch (index) {
      case 0:
        setCurrent(0);
        break;
      case 1:
        if (isValid(courseFields)) {
          setCurrent(1);
        } else {
          setFormError(true);
        }
        break;
      default:
        break;
    }
  };

  const handleLessonFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => {
    const { name, value } = event.target;

    const updatedLessons = lessons.map((lesson, i) => {
      if (i === currentLesson) {
        return {
          ...lesson,
          [name]: value,
          text: lesson.text,
          comments: lesson.comments || [],
        };
      }
      return lesson;
    });

    setLessons(updatedLessons as LessonType[]);
  };

  const handleTextEditorChange = (content: string, index: number) => {
      const updatedLessons = lessons.map((lesson, i) => {
        if (i === currentLesson) {
          return {
            ...lesson,
            text: content,
            comments: lesson.comments || []
          }
        }
        return lesson;
      });
      setLessons(updatedLessons as LessonType[]);
    }; 

  const changeCurrentLesson = (index: number) => {
    setCurrentLesson(index);
  };

  const addLesson = () => {
    setLessons((prev) => [
      ...prev,
      {
        id: `${Math.floor(Math.random() * 1000 + 1)}`,
        title: "",
        slug: "",
        preAmble: "",
        text: "",
        order: `${lessons.length}`,
        comments: []
      },
    ]);
    setCurrentLesson(lessons.length);
  };

  return (
    <>
      <FormNav
        courseCreateSteps={courseCreateSteps}
        currentStep={current}
        handleStep={handleStep}
        isValid={() => isValid(courseFields)}
        lessons={lessons}
        handleSubmit={handleSubmit}
      />
      <h2 className="text-xl font-bold" data-testid="title">
        Lag nytt kurs
      </h2>
      <form className="mt-8 max-w-4xl" data-testid="form" noValidate>
        {current === 0 && (
          <CourseDetailForm
            courseFields={courseFields}
            handleCourseFieldChange={handleCourseFieldChange}
            categories={categories}
          />
        )}
        {current === 1 && (
          <div
            data-testid="lesson_step"
            className="grid w-full grid-cols-[350px_minmax(50%,_1fr)] gap-12"
          >
            <LessonsAside
              lessons={lessons}
              currentLesson={currentLesson}
              changeCurrentLesson={changeCurrentLesson}
              addLesson={addLesson}
            />
            {lessons?.length > 0 && (
              <LessonDetailForm
                currentLesson={lessons[currentLesson]}
                handleLessonFieldChange={handleLessonFieldChange}
                handleTextEditorChange={handleTextEditorChange}
              />
            )}
          </div>
        )}
        {formError && <p data-testid="form_error">Fyll ut alle felter med *</p>}
        {success && (
          <p className="text-emerald-600" data-testid="form_success">
            Skjema sendt
          </p>
        )}
        {current === 2 && (
          <FormContentReview courseFields={courseFields} lessons={lessons} />
        )}
      </form>
    </>
  );
}
