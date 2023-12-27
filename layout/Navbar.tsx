import Link from "next/link";

import { ContentContainer } from "./ContentContainer";
import UserNavigation from "./Navbar/UserNavigation";

export default function Navbar() {
  return (
    <nav
      className={`w-full p-6 bg-gray-800 items-center justify-center fixed top-0 z-50`}
      id="navbar"
    >
      <ContentContainer>
        <ul className="flex justify-between lg:gap-6 text-gray-100">
          <Link className="cursor-pointer" href={`/`}>
            <li
              className="my-auto font-medium"
              // onClick={() => {
              // 	router.push(`/`, undefined, {
              // 		shallow: true,
              // 	});
              // }}
            >
              YAnime
            </li>
          </Link>
          <div className="flex gap-2 lg:gap-10">
            <li className="my-auto font-medium cursor-pointer">Search</li>
            <li className="my-auto font-medium8i6 cursor-pointer">Social</li>
            <li className="my-auto font-medium cursor-pointer">Forum</li>
          </div>

          <div className="flex lg:gap-4">
            <UserNavigation />
          </div>
        </ul>
      </ContentContainer>
    </nav>
  );
}
