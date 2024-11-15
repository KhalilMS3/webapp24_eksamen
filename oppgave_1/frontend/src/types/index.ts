export type Course = {
   id: string,
   title: string,
   slug: string,
   description: string,
   lessons: Lesson[],
   category: string,
}
export type Lesson = {
id: string;
title: string;
slug: string;
preAmble: string;
text: string
comments: Array<CommentType>
}

export type CommentType = {
   id: string;
   createdBy: {
      id: string;
      name: string;
   };
   comment: string;
   lesson: {
      slug: string;
   };
};