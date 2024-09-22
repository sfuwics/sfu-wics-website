import React from 'react'
import Link from 'next/link'
import { Roboto_Slab } from "next/font/google";

const font = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const CMSNavbar = () => {
  return (
    <div className='flex justify-between items-center py-1 px-5'>
      <Link href="/">
        <div>SFU WiCS</div>
      </Link>
    </div>
  )
}

export default CMSNavbar
