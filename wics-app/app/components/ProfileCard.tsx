import Link from "next/link";
import React from "react";
import { Profile } from "../lib/Interface";
import Image from "next/image";
import LinkedinIcon from "@/app/public/icons/linkedin.svg";
import LinkedinIconBlue from "@/app/public/icons/linkedin-blue.svg";
import { urlForImage } from "@/sanity/lib/image";

interface Props {
  profiles: Profile;
}

const ProfileCard = ({ profile }: Props) => {
  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return !!parsedUrl.protocol && !!parsedUrl.hostname;
    } catch (error) {
      return false;
    }
  };

  const showLinkedin = isValidUrl(profile?.linkedin);

  return (
    <div className="flex flex-col gap-3">
      <div className="group aspect-h-6 aspect-w-4 relative w-full overflow-hidden rounded-2xl shadow-md">
        {/* Image */}
        <Image
          src={profile.mainImage.asset.url}
          alt={`${profile?.name}'s profile image`}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={profile.mainImage.asset.metadata?.lqip}
          className="transition-all duration-300 sm:group-hover:brightness-[0.15] transition-opacity duration-700 opacity-100 motion-safe:animate-fadeIn" // Apply hover only for screens >= sm
        />

        {/* Overlay (Bio and Name) */}
        <div className="absolute inset-0 flex hidden flex-col items-center justify-center gap-5 text-white opacity-0 transition-all duration-300 sm:flex sm:group-hover:opacity-100">
          {/* Visible on non-mobile */}
          <p className="text-md mt-2 px-4">{profile?.blurb}</p>

          {showLinkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity duration-300 hover:opacity-80"
            >
              <Image src={LinkedinIcon} height={24} width={24} />
            </a>
          )}
        </div>
      </div>

      {/* Name, Role, and LinkedIn Icon */}
      <div className="relative flex flex-col items-start">
        <div className="flex items-center gap-2">
          <p className="text-xl font-medium text-wics-blue-500 sm:text-2xl md:text-3xl">
            {profile?.name}
          </p>

          {/* LinkedIn Icon on Mobile */}
          {showLinkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:hidden" // Only show on mobile
            >
              <Image
                src={LinkedinIconBlue}
                alt="LinkedIn"
                height={20}
                width={20}
              />
            </a>
          )}
        </div>
        <h2 className="text-md sm:text-lg">{profile?.role}</h2>
      </div>

      {/* Mobile-specific blurb */}
      <p className="mt-2 text-sm sm:hidden">{profile?.blurb}</p>
    </div>
  );
};

export default ProfileCard;
