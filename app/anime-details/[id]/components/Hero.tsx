import AddToListButtonWrapper from "./Hero/AddToListButtonDropdownWrapper";
import AddToLikesButtonWrapper from "./Hero/AddToLikesButtonWrapper";
import HeroDescription from "./Hero/HeroDescription";

type Props = {
  anime: {
    bannerImage: string;
    coverImage: {
      extraLarge: string;
    };
    title: {
      english: string;
    };
    description: string;
  };
};

export default function Hero({ anime, params }: Props) {
  return (
    <div className="header-wrap relative bg-slate-50">
      <div
        className="banner w-full h-[400px] -mt-12 relative"
        style={{
          background: `url(${anime.bannerImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 35%",
        }}
      >
        <div
          className="absolute inset-0 bg-opacity-50 bg-black shadow-inner"
          style={{
            background:
              "linear-gradient(180deg,rgba(10, 10, 10, 0) 40%,rgba(10, 10, 10, 0.6))",
          }}
        ></div>
      </div>
      <div className="header container max-w-5xl mx-auto">
        <div
          className="container grid gap-7 max-w-6xl "
          style={{ gridTemplateColumns: "270px auto" }}
        >
          <div className="relative -mt-32">
            <div className="static shadow-lg">
              <img
                className="w-full object-cover rounded-sm"
                src={anime.coverImage.extraLarge}
                alt={anime.title.english}
              />
            </div>
            <div
              className="grid my-5 gap-4"
              style={{ gridTemplateColumns: "auto 35px" }}
            >
              <AddToListButtonWrapper
                params={params}
                english={anime.title.english || ""}
              />
              <AddToLikesButtonWrapper
                params={params}
                english={anime.title.english || ""}
              />
            </div>
          </div>

          <div className="pt-6 pb-4">
            <h2 className="text-3xl mb-2">{anime.title.english}</h2>
            <HeroDescription description={anime.description} />
          </div>
        </div>
      </div>
    </div>
  );
}
