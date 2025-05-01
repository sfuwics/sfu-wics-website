// components/blog/PaginatedPosts.tsx
"use client";

import React, { useState } from "react";
import PostComponent from "./PostComponent";
import BlogPostComponent from "@/app/components/blog/BlogPostComponent";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginatedPostsProps {
  posts: any[];
  currentPage?: number; // Only needed for 'dynamic' mode
  postsPerPage: number;
  url: string;
  mode?: "client" | "dynamic";
}

const PaginatedPosts = ({
  posts = [],
  currentPage = 1,
  postsPerPage,
  url,
  mode = "client",
}: PaginatedPostsProps) => {
  const [clientPage, setClientPage] = useState(1);
  const activePage = mode === "client" ? clientPage : currentPage;

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const goToPage = (page: number) => {
    if (mode === "client") setClientPage(page);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPosts.map((post) => (
            <div key={post?._id}>
              {post?._type === "blogPost" && <BlogPostComponent post={post} />}
              {post?._type === "post" && <PostComponent post={post} />}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="m-4 sm:m-8 flex items-center justify-center gap-2">
        {/* Previous */}
        {activePage > 1 && (
          mode === "dynamic" ? (
            <Link href={`/${url}/pg-${activePage - 1}`}>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-200 transition-colors hover:bg-neutral-200 disabled:opacity-50">
                <FaChevronLeft className="h-4 w-4 text-wics-blue-500" />
              </button>
            </Link>
          ) : (
            <button
              onClick={() => goToPage(activePage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-200 transition-colors hover:bg-neutral-200 disabled:opacity-50"
            >
              <FaChevronLeft className="h-4 w-4 text-wics-blue-500" />
            </button>
          )
        )}

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => (
          mode === "dynamic" ? (
            <Link key={index + 1} href={`/${url}/pg-${index + 1}`}>
              <button
                className={`rounded-xl border-2 border-neutral-200 px-3 py-1 ${
                  activePage === index + 1
                    ? "bg-wics-blue-500 text-white"
                    : "bg-white text-wics-blue-500"
                }`}
              >
                {index + 1}
              </button>
            </Link>
          ) : (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`rounded-xl border-2 border-neutral-200 px-3 py-1 ${
                activePage === index + 1
                  ? "bg-wics-blue-500 text-white"
                  : "bg-white text-wics-blue-500"
              }`}
            >
              {index + 1}
            </button>
          )
        ))}

        {/* Next */}
        {activePage < totalPages && (
          mode === "dynamic" ? (
            <Link href={`/${url}/pg-${activePage + 1}`}>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-200 transition-colors hover:bg-neutral-200 disabled:opacity-50">
                <FaChevronRight className="h-4 w-4 text-wics-blue-500" />
              </button>
            </Link>
          ) : (
            <button
              onClick={() => goToPage(activePage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-neutral-200 transition-colors hover:bg-neutral-200 disabled:opacity-50"
            >
              <FaChevronRight className="h-4 w-4 text-wics-blue-500" />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PaginatedPosts;
