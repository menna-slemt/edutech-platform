import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";

export default async function HomePage() {
  const featuredCourses = await prisma.course.findMany({
    where: { featured: true },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Featured Courses</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {featuredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
