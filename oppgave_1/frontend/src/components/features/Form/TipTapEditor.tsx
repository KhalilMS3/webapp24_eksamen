import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import starterKit from "@tiptap/starter-kit";
type TipTapEditorProps = {
  content: string;
  onChange: (content: any) => void;
};
export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [starterKit.configure()],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
     },
     editorProps: {
        attributes: {
           class: 
           "rounded-md border min-h-[200px] border-input bg-back "
       }
    }
  });
  return (
    <section className="">
      <EditorContent editor={editor} />
    </section>
  );
}
