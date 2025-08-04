import { creatorsInfo } from "@/util/creatorsInfo";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Creator from "./creator";

const Footer = () => {
  return (
    <footer className="bg-[#01357A] text-[#F4F6F8]">
      <div className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row sm:justify-center sm:gap-16 lg:gap-32">
        <Link
          href={"https://github.com/chingu-voyages/V56-tier3-team-31"}
          className="flex flex-col gap-2 items-center hover:underline hover:underline-offset-4 group my-4 lg:flex-row lg:gap-4"
          target="_blank"
        >
          <Image
            src={"/icon_github.svg"}
            alt="GitHub"
            width={80}
            height={80}
            aria-hidden
            className="pb-1 border-b-[1.5px] border-transparent group-hover:border-[#F4F6F8]"
          />
          <div className="flex flex-col items-center text-md lg:items-start">
            <p className="lg:text-xl">Project Repository</p>
            <p>V56-tier3-team-31</p>
          </div>
        </Link>

        <div className="flex flex-col items-center lg:items-start">
          <h6 className="text-xl mt-4">Meet the Team</h6>
          <dl className="flex flex-col items-center gap-2 lg:items-start">
            <dt className="text-lg mt-4">- Developers -</dt>

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8 lg:flex-col lg:items-start lg:gap-2">
              {creatorsInfo.developers.map((dev, index) => (
                <Creator
                  key={index}
                  creatorName={dev.creatorName}
                  links={dev.links}
                />
              ))}
            </div>

            <dt className="text-lg mt-4">- Scrum Master -</dt>

            {creatorsInfo.scrumMasters.map((dev, index) => (
              <Creator
                key={index}
                creatorName={dev.creatorName}
                links={dev.links}
              />
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-[#002B63] p-2 text-xs">
        <p className="text-center">
          © Copyright 2025. All Rights Reserved. V56-tier3-team-31
        </p>
      </div>
    </footer>
  );
};

export default Footer;
