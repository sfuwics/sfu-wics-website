import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-5 sm:py-8">
      <h2 className="mx-auto text-4xl sm:text-5xl font-bold">{title}</h2>

      {tags && (
        <div className="mt-2 text-xs hover:text-wics-yellow-500">
          <Link href="/tag">#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
