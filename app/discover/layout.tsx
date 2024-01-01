"use client";

import SearchWrapper from "../components/SearchWrapper";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="max-w-6xl md:mx-14 lg:mx-auto lg:max-w-4xl xl:max-w-screen-lg relative mt-6">
        <SearchWrapper />
      </header>

      <main className="max-w-6xl md:mx-14 lg:mx-auto  lg:max-w-4xl xl:max-w-screen-lg relative">
        <section className="mt-6 mx-2 md:mx-0">{children}</section>
      </main>
    </div>
  );
}
