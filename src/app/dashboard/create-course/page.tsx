

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CreateCoursePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    featured: false,
  });

  // Auth protection
  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session?.user) {
      router.push("/register");
      return;
    }

    if (session.user.role !== "ADMIN") {
      router.push("/dashboard"); // Redirect non-admin users
      return;
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to create course");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render anything if not authenticated or not admin
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            placeholder="Enter course title"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="Enter course description"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={data.thumbnail}
            onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={data.featured}
              onChange={(e) => setData({ ...data, featured: e.target.checked })}
            />
            <span className="text-sm font-medium">Featured Course</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}