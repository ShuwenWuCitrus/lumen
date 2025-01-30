"use client";

import { useState } from "react";
import CommunityPost from "@/components/CommunityPost";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/utils/formatDate";

interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function CommunityPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const addPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    const post: Post = {
      id: crypto.randomUUID(),
      content: content.trim(),
      author: author.trim(),
      createdAt: formatDate(new Date()),
    };

    setPosts([post, ...posts]);
    setContent("");
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-dark mb-8">
            {t.community.title}
          </h1>

          <form onSubmit={addPost} className="mb-8">
            <div className="mb-4">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={t.community.namePlaceholder}
                className="input-field mb-4"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.community.contentPlaceholder}
                className="input-field min-h-[120px]"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              {t.community.postButton}
            </button>
          </form>

          <div className="space-y-4">
            {posts.map((post) => (
              <CommunityPost key={post.id} {...post} onDelete={deletePost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
