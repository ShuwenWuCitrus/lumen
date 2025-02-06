"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommunityPost } from "@/components/features/community/CommunityPost";
import { CreatePost } from "@/components/features/community/CreatePost";
import { CategoryFilters } from "@/components/features/community/CategoryFilters";
import { Category, Post, PostCategory } from "@/types/community";

// 示例数据
const dummyPosts: Post[] = [
  {
    id: "1",
    author: "MindfulExplorer",
    content:
      "Finally found a system that works for my ADHD brain! Breaking tasks into 25-minute chunks with short breaks has been a game-changer. Anyone else use the Pomodoro technique?",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    category: "tips",
  },
  {
    id: "2",
    author: "CreativeSpirit",
    content:
      "Just wanted to share a small victory - I managed to complete my entire morning routine without getting distracted! It's the little wins that count. ✨",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 42,
    comments: 12,
    category: "victories",
  },
  {
    id: "3",
    author: "QuietDreamer",
    content:
      "Does anyone else feel overwhelmed by loud environments? Looking for tips on how to stay focused in noisy places while working.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 18,
    comments: 15,
    category: "questions",
  },
  {
    id: "4",
    author: "ADHDAdvocate",
    content:
      "Found this amazing app for time blocking! It's been helping me stay on track with my daily tasks. Happy to share more details if anyone's interested.",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 35,
    comments: 20,
    category: "resources",
  },
  {
    id: "5",
    author: "MindfulLearner",
    content:
      "Having a rough day with executive dysfunction. Could use some encouragement or tips from others who've been there. 💭",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    likes: 28,
    comments: 22,
    category: "support",
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [posts, setPosts] = useState<Post[]>(dummyPosts);

  const handleCreatePost = (
    newPost: Omit<Post, "id" | "createdAt" | "likes" | "comments">
  ) => {
    const post: Post = {
      ...newPost,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  // 过滤帖子
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="container-base py-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="gradient-text text-4xl font-bold mb-md">
            {t.community.title}
          </h1>

          <CreatePost onCreatePost={handleCreatePost} />

          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="space-y-md pb-xl">
            {filteredPosts.map((post) => (
              <CommunityPost
                key={post.id}
                {...post}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
