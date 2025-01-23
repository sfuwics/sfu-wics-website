import Link from "next/link";
import React from "react";
import { Profile } from "../utils/Interface";
import Image from "next/image";
import LinkedinIcon from "@/app/public/icons/linkedin.svg";
import LinkedinIconBlue from "@/app/public/icons/linkedin-blue.svg";

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
          className="transition-all duration-300 sm:group-hover:brightness-50" // Apply hover only for screens >= sm
        />

        {/* Overlay (Bio and Name) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-white opacity-0 transition-all duration-300 sm:group-hover:opacity-100 sm:flex hidden">
          {/* Visible on non-mobile */}
          <p className="text-md mt-2 px-4">{profile?.blurb}</p>

          {showLinkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity duration-300"
            >
              <Image src={LinkedinIcon} height={24} width={24} />
            </a>
          )}
        </div>
      </div>

      {/* Name, Role, and LinkedIn Icon */}
      <div className="relative flex flex-col items-start">
        <div className="flex items-center gap-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-wics-blue-500">
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
              <Image src={LinkedinIconBlue} alt="LinkedIn" height={20} width={20} />
            </a>
          )}
        </div>
        <h2 className="text-md sm:text-lg">{profile?.role}</h2>
      </div>

      {/* Mobile-specific blurb */}
      <p className="text-sm sm:hidden mt-2">{profile?.blurb}</p> 
    </div>
  );
};

export default ProfileCard;
