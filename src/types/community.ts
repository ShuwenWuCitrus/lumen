export type Category =
  | "all"
  | "tips"
  | "support"
  | "questions"
  | "victories"
  | "resources";

export type PostCategory = Exclude<Category, "all">;

export interface Post {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  category: PostCategory;
}

export const CATEGORIES: Category[] = [
  "all",
  "tips",
  "support",
  "questions",
  "victories",
  "resources",
];

export const getCategoryColor = (category: Category) => {
  switch (category) {
    case "tips":
      return "text-primary-dark bg-primary-light/20 hover:bg-primary-light/30";
    case "support":
      return "text-secondary-dark bg-secondary-light/20 hover:bg-secondary-light/30";
    case "questions":
      return "text-accent-blue bg-accent-blue/20 hover:bg-accent-blue/30";
    case "victories":
      return "text-accent-yellow bg-accent-yellow/20 hover:bg-accent-yellow/30";
    case "resources":
      return "text-accent-pink bg-accent-pink/20 hover:bg-accent-pink/30";
    default:
      return "text-primary bg-primary-light/10 hover:bg-primary-light/20";
  }
};
