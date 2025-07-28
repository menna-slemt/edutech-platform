export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  duration: string;
  price: number;
  rating: number;
  studentsCount: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  createdAt: Date;
  creatorId: string | null;
  creator: {
    name: string;
    email: string;
  } | null;
}

export interface CreateCourseData {
  title: string;
  description: string;
  thumbnail?: string;
  featured: boolean;
  duration: string;
  price: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  creatorId: string;
}

export interface PaginatedCourses {
  courses: Course[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
}