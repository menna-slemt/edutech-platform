import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";

export default async function DashboardPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Courses</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
