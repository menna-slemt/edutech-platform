import { prisma } from "@/lib/prisma";

type Props = {
  params: { id: string };
};

export default async function CourseDetailPage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  if (!course) return <div>Course not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
}
