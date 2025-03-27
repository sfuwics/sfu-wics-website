import React from "react";
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import EventComponent from "@/app/components/EventComponent";
import ComponentCarousel from "../components/carousels/ComponentCarousel";
import Image from "next/image";
import FeatureComponent from "../components/FeatureComponent";
import Link from "next/link";
import TryCatchPic from "@/app/public/images/events/trycatch.png";
import GHCPic from "@/app/public/images/events/ghc.png";
import CANCWiCPic from "@/app/public/images/events/canc-wic.jpg";

const pageBuilder = `
  *[_type == "pageBuilder"] {
    title,
    slug,
    logo,
    link,
    blurb,
    images[]{
      asset->{url},
      alt
    },
    tags[]->{
      title
    }
  }
`;

export const revalidate = 60;

export default async function Sponsors() {


  return (
    <div className="mx-auto">
      <Header title="Sponsors" />

    </div>
  );
}
