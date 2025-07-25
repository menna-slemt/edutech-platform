import Link from "next/link";

type Course = {
  id: string;
  title: string;  
  description: string;
  thumbnail: string;
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
    <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      {/* <img src={course.thumbnail} alt={course.title} className="rounded-md mb-2" /> */}
      <h2 className="font-semibold">{course.title}</h2>
      <p className="text-sm text-muted-foreground">{course.description}</p>
    </div>
  </Link>

  );
}
