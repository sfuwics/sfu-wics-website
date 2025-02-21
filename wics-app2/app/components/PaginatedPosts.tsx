// components/blog/PaginatedPosts.tsx
"use client";

import React, { useState } from "react";
import PostComponent from "@/app/components/PostComponent";
import BlogPostComponent from "@/app/components/blog/BlogPostComponent";
import { motion, AnimatePresence } from "framer-motion";

const PaginatedPosts = ({ posts = [] }: { posts: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Page change handlers
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  return (
    <div>
      {/* Animations for page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage} // Ensure animation triggers on page change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPosts?.length > 0 &&
            currentPosts.map((post) => (
              <div key={post?._id}>
                {post?._type === 'blogPost' && (
                  <BlogPostComponent post={post} />
                )}
                {post?._type === 'post' && (
                  <PostComponent post={post} />
                )}
              </div>
          ))}
        </motion.div>
      </AnimatePresence>




      <div className="flex justify-center items-center gap-2 mt-4">
          {/* Previous Button */}
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="px-3 py-1 bg-gray-200 rounded-md"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default PaginatedPosts;