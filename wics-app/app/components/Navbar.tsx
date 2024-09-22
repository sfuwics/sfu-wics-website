import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="mx-auto max-w-5xl px-6">
            <div className="flex justify-between items-center h-16 w-full">
                <Link href="/">
                    <div>SFU WiCS</div>
                </Link>
                <div>Theme</div>
            </div>
        </div>
    );
};

export default Navbar;
