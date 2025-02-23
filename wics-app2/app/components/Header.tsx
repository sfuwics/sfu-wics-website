import Link from "next/link";
import React from "react";

interface Props {
  title: string;
}

const Header = ({ title = "" }: Props) => {
  return (
    <header className="py-10 sm:pb-20 lg:pb-26">
      <h2 className="mx-auto text-5xl sm:text-6xl font-bold text-wics-blue-500">{title}</h2>
    </header>
  );
};

export default Header;
