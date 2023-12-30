"use client";

import Search from "@/ui/Search";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="max-w-7xl md:mx-20 xl:mx-auto relative mt-6">
        <Search />
      </header>

      <main className="max-w-7xl md:mx-20 xl:mx-auto relative">{children}</main>
    </div>
  );
}
