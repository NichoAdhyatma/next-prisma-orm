"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

async function addPost(
  e: React.FormEvent<HTMLFormElement>,
  data: { title: string; content: string }
) {
  e.preventDefault();
  const req = await fetch(`
  /api/createPost`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const res = await req.json();

  if (!res.ok) console.log(res);
}

export default function Form() {
  const [data, setData] = useState({ title: "", content: "" });
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      className="flex flex-col gap-4 w-fit"
      onSubmit={(e) => addPost(e, data).finally(() => router.refresh())}
    >
      <input
        type="text"
        onChange={handleOnChange}
        name="title"
        value={data.title}
        className="text-black"
        placeholder="title"
      />
      <input
        type="text"
        onChange={handleOnChange}
        className="text-black"
        name="content"
        placeholder="content"
        value={data.content}
      />
      <button
        type="submit"
        className="bg-indigo-500 px-4 py-2 w-fit font-medium text-white rounded-lg hover:bg-indigo-600 ring-1 focus:ring-4 focus:ring-indigo-300 hover:scale-[1.01] transition-all"
      >
        New Post
      </button>
    </form>
  );
}
