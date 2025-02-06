export type Category =
  | "All"
  | "Support"
  | "Tips"
  | "Victories"
  | "Questions"
  | "Resources";

export type Post = {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  category: Exclude<Category, "All">;
};
