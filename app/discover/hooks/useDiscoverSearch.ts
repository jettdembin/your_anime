"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const useDiscoverSearch = () => {
	const searchParams = useSearchParams();

	const discovering = searchParams?.get("search") || "";

	const [search, setSearch] = useState<string | null>(discovering);
};

export { useDiscoverSearch };
