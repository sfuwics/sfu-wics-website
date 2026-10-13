import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-5 sm:py-8">
      <h1 className="mx-auto text-4xl sm:text-5xl font-bold">{title}</h1>

      {tags && (
        <div className="mt-2 text-xs">
          <Link
            href="/blog/tag"
            className="decoration-wics-yellow-500 decoration-2 hover:underline"
          >
            #tags
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
