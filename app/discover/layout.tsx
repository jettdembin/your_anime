"use client";

import Search from "@/ui/Search";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="max-w-6xl md:mx-14 lg:mx-auto lg:max-w-4xl xl:max-w-screen-lg relative mt-6">
        <Search />
      </header>

      <main className="max-w-6xl md:mx-14 lg:mx-auto  lg:max-w-4xl xl:max-w-screen-lg relative">
        {children}
      </main>
    </div>
  );
}
