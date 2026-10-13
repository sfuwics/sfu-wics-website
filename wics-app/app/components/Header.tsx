import React from "react";

interface Props {
  title: string;
  // Use "h2" for section titles below the page's main heading
  as?: "h1" | "h2";
}

const Header = ({ title = "", as: Tag = "h1" }: Props) => {
  return (
    <header className="py-10 sm:pb-20">
      <Tag className="mx-auto text-5xl sm:text-6xl font-bold text-wics-blue-500">{title}</Tag>
    </header>
  );
};

export default Header;
