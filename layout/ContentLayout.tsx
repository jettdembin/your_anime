import Link from "next/link";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  category: string;
};

export const ContentLayout = ({
  children,
  title,
  category,
}: ContentLayoutProps) => {
  return (
    <section className="xl:mt-16">
      <header className="max-w-7xl flex items-end justify-between py-6">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <Link
          href={`/discover?category=${category}`}
          className="cursor-pointer flex items-center"
        >
          <h6 className="text-xs font-semibold text-gray-400 transition-colors hover:text-gray-600 ">
            View All
          </h6>
        </Link>
      </header>
      <main className="max-w-7xl mx-auto">{children}</main>
    </section>
  );
};
