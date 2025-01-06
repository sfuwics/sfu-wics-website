import Link from "next/link";
import React from "react";
import { Profile } from "../utils/Interface";
import Image from "next/image";
import LinkedinIcon from "@/app/public/icons/linkedin.svg";

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
    <div className="flex flex-col gap-2">
      <div className="group aspect-h-6 aspect-w-4 relative w-full overflow-hidden rounded-2xl shadow-md">
        {/* Image */}
        <Image
          src={profile.mainImage.asset.url}
          alt={`${profile?.name}'s profile image`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 group-hover:brightness-50"
        />

        {/* Overlay (Bio and Name) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <p className="text-md mt-2 px-4">{profile?.blurb}</p>

          {showLinkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity duration-300">
            <Image src={LinkedinIcon} height={24} width={24} />
          </a>
          )}
          
        </div>
      </div>

      <div className="relative flex flex-col items-start">
        <div className="flex flex-col">
          <p className="text-3xl font-medium text-wics-blue-500">
            {profile?.name}
          </p>
          <h2 className="text-lg">{profile?.role}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
