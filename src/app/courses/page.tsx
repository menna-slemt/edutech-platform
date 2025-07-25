import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";
import { redirect } from "next/navigation";

async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: [
        { featured: 'desc' }, // Featured courses first
        { createdAt: 'desc' }  // Then by newest
      ],
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  // This check is redundant with middleware, but good for extra security
  if (!session?.user) {
    redirect("/login");
  }

  const courses = await getCourses();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Courses</h1>
        <p className="text-gray-600">
          Welcome back, {session.user.name}! Explore our courses and start learning.
        </p>
      </div>

      {/* Featured Courses Section */}
      {courses.some(course => course.featured) && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter(course => course.featured)
              .map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </div>
      )}

      {/* All Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Available</h3>
            <p className="text-gray-500 mb-4">
              There are no courses available at the moment. Check back later!
            </p>
            
            {/* Show create course link for admins */}
            {session.user.role === "ADMIN" && (
              <a 
                href="/dashboard/create-course"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Course
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}