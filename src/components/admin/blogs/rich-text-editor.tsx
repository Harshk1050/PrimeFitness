"use client";

import "react-quill-new/dist/quill.snow.css";

import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote", "code-block"],
    ["link"],
    [{ align: [] }],
    ["clean"],
  ],
};

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function RichTextEditor({ value, onChange }: Props) {
  return (
    <div className="bg-white rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="min-h-[300px]"
      />
    </div>
  );
}
