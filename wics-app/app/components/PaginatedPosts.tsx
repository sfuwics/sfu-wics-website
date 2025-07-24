"use client";

import React, { useState } from "react";
import PostComponent from "./PostComponent";
import BlogPostComponent from "@/app/components/blog/BlogPostComponent";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

interface PaginatedPostsProps {
  posts: any[];
  currentPage?: number;
  postsPerPage: number;
  url: string;
  mode?: "client" | "dynamic";
  maxVisiblePages?: number;
}

const PaginatedPosts = ({
  posts = [],
  currentPage = 1,
  postsPerPage,
  url,
  mode = "client",
  maxVisiblePages = 2,
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

  // Calculate visible page range
  const getVisiblePages = () => {
    let startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const renderPageButton = (page: number) => {
    return mode === "dynamic" ? (
      <Link key={page} href={`/${url}/pg-${page}`}>
        <button
          className={`rounded-xl border-2 border-neutral-200 px-3 py-1 ${
            activePage === page
              ? "bg-wics-blue-500 text-white"
              : "bg-white text-wics-blue-500"
          }`}
        >
          {page}
        </button>
      </Link>
    ) : (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`rounded-xl border-2 border-neutral-200 px-3 py-1 ${
          activePage === page
            ? "bg-wics-blue-500 text-white"
            : "bg-white text-wics-blue-500"
        }`}
      >
        {page}
      </button>
    );
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

      <div className="m-4 flex items-center justify-center gap-1 sm:m-8 sm:gap-2">
        {/* Previous */}
        {activePage > 1 &&
          (mode === "dynamic" ? (
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
          ))}

        {/* First Page */}
        {activePage > Math.floor(maxVisiblePages / 2) + 1 &&
          totalPages > maxVisiblePages && (
            <>
              {renderPageButton(1)}
              {activePage > Math.floor(maxVisiblePages / 2) + 2 && (
                <span className="flex items-center sm:px-2">
                  <FaEllipsisH className="text-neutral-400" />
                </span>
              )}
            </>
          )}

        {/* Visible Pages */}
        {getVisiblePages().map((page) => renderPageButton(page))}

        {/* Last Page */}
        {activePage < totalPages - Math.floor(maxVisiblePages / 2) &&
          totalPages > maxVisiblePages && (
            <>
              {activePage + Math.floor(maxVisiblePages / 2) < totalPages && (
                <span className="flex items-center sm:px-2">
                  <FaEllipsisH className="text-neutral-400" />
                </span>
              )}
              {renderPageButton(totalPages)}
            </>
          )}

        {/* Next */}
        {activePage < totalPages &&
          (mode === "dynamic" ? (
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
          ))}
      </div>
    </div>
  );
};

export default PaginatedPosts;
