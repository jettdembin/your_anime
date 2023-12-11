import Link from "next/link";

import { ContentContainer } from "./ContentContainer";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  category: string;
  href: string;
};
export const ContentLayout = ({
  children,
  title,
  category,
  href,
}: ContentLayoutProps) => {
  return (
    <section className="xl:mt-16">
      <header className="py-6">
        <ContentContainer className="flex items-end justify-between">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <Link
            href={href || `/discover?category=${category}`}
            className="cursor-pointer flex items-center"
          >
            <h6 className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-600 ">
              View All
            </h6>
          </Link>
        </ContentContainer>
      </header>
      <main>
        <ContentContainer>{children}</ContentContainer>
      </main>
    </section>
  );
};
