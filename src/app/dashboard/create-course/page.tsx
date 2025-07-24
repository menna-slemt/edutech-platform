"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <input
        type="text"
        placeholder="Course title"
        className="w-full p-2 border"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        className="w-full p-2 border"
        value={data.thumbnail}
        onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.featured}
          onChange={(e) => setData({ ...data, featured: e.target.checked })}
        />
        Featured
      </label>
      <button type="submit" className="w-full p-2 bg-blue-600 text-white">
        Create Course
      </button>
    </form>
  );
}
