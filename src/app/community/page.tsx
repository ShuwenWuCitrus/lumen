"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommunityPost } from "@/components/features/community/CommunityPost";
import { CreatePost } from "@/components/features/community/CreatePost";
import { CategoryFilters } from "@/components/features/community/CategoryFilters";
import { Category, Post } from "@/types/community";

// Dummy data for demonstration
const dummyPosts: Post[] = [
  {
    id: "1",
    author: "MindfulExplorer",
    content:
      "Finally found a system that works for my ADHD brain! Breaking tasks into 25-minute chunks with short breaks has been a game-changer. Anyone else use the Pomodoro technique?",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    category: "Tips",
  },
  {
    id: "2",
    author: "CreativeSpirit",
    content:
      "Just wanted to share a small victory - I managed to complete my entire morning routine without getting distracted! It's the little wins that count. ✨",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 42,
    comments: 12,
    category: "Victories",
  },
  {
    id: "3",
    author: "QuietDreamer",
    content:
      "Does anyone else feel overwhelmed by loud environments? Looking for tips on how to stay focused in noisy places while working.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 18,
    comments: 15,
    category: "Questions",
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
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
    // In a real app, this would open a comment dialog
    console.log("Open comment dialog for post:", id);
  };

  const filteredPosts =
    selectedCategory === "All"
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
                id={post.id}
                author={post.author}
                content={post.content}
                createdAt={post.createdAt}
                likes={post.likes}
                comments={post.comments}
                category={post.category}
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
