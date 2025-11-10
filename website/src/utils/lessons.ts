export interface Lesson {
  id: string;
  title: string;
  path: string;
  order: number;
}

export const lessons: Lesson[] = [
  {
    id: '01-gioi-thieu',
    title: 'Bài 01: Giới thiệu và Tổng quan',
    path: '/lessons/01-gioi-thieu',
    order: 1,
  },
  {
    id: '02-thiet-lap-moi-truong',
    title: 'Bài 02: Thiết lập Môi trường Phát triển',
    path: '/lessons/02-thiet-lap-moi-truong',
    order: 2,
  },
  {
    id: '03a-xay-dung-component-sfc',
    title: 'Bài 03a: Xây dựng Component với SFC (.vue)',
    path: '/lessons/03a-xay-dung-component-sfc',
    order: 3,
  },
  {
    id: '03b-xay-dung-component-tsx',
    title: 'Bài 03b: Xây dựng Component với TSX/JSX (Khuyến nghị)',
    path: '/lessons/03b-xay-dung-component-tsx',
    order: 4,
  },
  {
    id: '04-cau-hinh-build',
    title: 'Bài 04: Cấu hình Build cho Thư viện',
    path: '/lessons/04-cau-hinh-build',
    order: 5,
  },
  {
    id: '05-dong-goi-bundle',
    title: 'Bài 05: Đóng gói và Bundle',
    path: '/lessons/05-dong-goi-bundle',
    order: 6,
  },
  {
    id: '06-xuat-ban-npm',
    title: 'Bài 06: Xuất bản lên Npm',
    path: '/lessons/06-xuat-ban-npm',
    order: 7,
  },
  {
    id: '07-tai-lieu-demo',
    title: 'Bài 07: Tài liệu và Demo',
    path: '/lessons/07-tai-lieu-demo',
    order: 8,
  },
  {
    id: '08a-github-actions',
    title: 'Bài 08a: CI/CD với GitHub Actions',
    path: '/lessons/08a-github-actions',
    order: 9,
  },
  {
    id: '08b-gitlab-ci',
    title: 'Bài 08b: CI/CD với GitLab CI',
    path: '/lessons/08b-gitlab-ci',
    order: 10,
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getNextLesson(currentId: string): Lesson | undefined {
  const current = lessons.find((l) => l.id === currentId);
  if (!current) return undefined;
  return lessons.find((l) => l.order === current.order + 1);
}

export function getPrevLesson(currentId: string): Lesson | undefined {
  const current = lessons.find((l) => l.id === currentId);
  if (!current) return undefined;
  return lessons.find((l) => l.order === current.order - 1);
}
