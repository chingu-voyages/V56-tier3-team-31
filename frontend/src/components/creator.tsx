import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CreatorLinkProps {
  type: "github" | "linkedin";
  href: string;
}

const CreatorLink = ({ type, href }: CreatorLinkProps) => {
  let iconAttributes = { src: "", alt: "" };
  switch (type) {
    case "github":
      iconAttributes = {
        src: "/icon_github.svg",
        alt: "GitHub",
      };
      break;
    case "linkedin":
      iconAttributes = {
        src: "/icon_linkedin.svg",
        alt: "LinkedIn",
      };
      break;
    default:
  }

  return (
    <Link
      href={href}
      className="block pb-1 border-b-1 border-transparent hover:border-[#F4F6F8]"
      target="_blank"
    >
      <Image
        src={iconAttributes.src}
        alt={iconAttributes.alt}
        width={30}
        height={30}
      />
    </Link>
  );
};

interface CreatorProps {
  creatorName: string;
  links: ReadonlyArray<CreatorLinkProps>;
}

const Creator = ({ creatorName, links }: CreatorProps) => {
  return (
    <dd className="flex flex-col items-center gap-1 mb-2 lg:flex-row lg:gap-4">
      <p>{creatorName}</p>
      <div className="flex gap-4">
        {links.map((link, index) => (
          <CreatorLink key={index} type={link.type} href={link.href} />
        ))}
      </div>
    </dd>
  );
};

export default Creator;
