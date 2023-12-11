"use client";

import { useEffect } from "react";

import { CardTypeProvider } from "@/context/CardTypeContext";

import { useAuthContext } from "@/context/AuthContext";

import Top10Likes from "./UserProfile/Top10Likes";
import { ContentLayout } from "@/layout/ContentLayout";

const UserProfile = ({ data }) => {
  const { setAuth } = useAuthContext();

  useEffect(() => {
    setAuth(data);
  }, [data, setAuth]);

  const { likes, topAnimes } = data || {};

  return (
    <div>
      <section className="mt-8 mb-14">
        <div className="bg-white py-4">
          <div className="flex flex-col items-center">
            <h2 className="text-xl text-[#4ad3fc]">
              {!!likes?.length ? likes.length : 0}
            </h2>
            <h4 className="text-sm font-semibold">Total Anime</h4>
          </div>
        </div>
      </section>

      <ContentLayout title="YOUR TOP 10 ANIME 🤩">
        <CardTypeProvider type="list">
          <Top10Likes likes={likes} topAnimes={topAnimes} />
        </CardTypeProvider>
      </ContentLayout>
    </div>
  );
};

export default UserProfile;
