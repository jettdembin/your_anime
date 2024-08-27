"use client";

import Search from "@/ui/Search";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="">
        {/* <header className="max-w-6xl md:mx-14 lg:mx-auto lg:max-w-4xl xl:max-w-screen-lg relative mt-6"> */}
        <Search />
      </header>

      <main className="container max-w-7xl mx-auto md:px-4 lg:px-6 xl:px-0">
        {/* <main className="max-w-6xl md:mx-14 lg:mx-auto  lg:max-w-4xl xl:max-w-screen-lg relative"> */}
        <section className="mt-6 mx-2 md:mx-0">{children}</section>
      </main>
    </div>
  );
}
