"use client";

interface CommunityPostProps {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

export default function CommunityPost({
  id,
  content,
  author,
  createdAt,
  onDelete,
}: CommunityPostProps) {
  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="font-medium text-primary-dark">{author}</span>
          <span className="text-sm text-gray-500 ml-2">{createdAt}</span>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
