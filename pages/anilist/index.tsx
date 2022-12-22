import React from "react";

const AniList = () => {
  return (
    <div>
      <nav className="h-16 bg-gray-800 flex items-center justify-center">
        <ul className="mx-auto flex gap-96 text-gray-100">
          <li className="my-auto font-medium">AL</li>
          <li className="my-auto font-medium">Search</li>
          <div className="flex gap-4">
            <li className="my-auto font-medium">Login</li>
            <li>
              <button className="rounded-md bg-emerald-500 text-white px-3 py-1 font-medium">
                Sign Up
              </button>
            </li>
          </div>
        </ul>
      </nav>
      <header className="mx-auto my-12 bg-gray-800 px-20 py-16 max-w-6xl rounded-3xl">
        <h1 className="text-3xl font-bold text-gray-50 mb-10 mx-auto max-w-full text-center">
          The next generation anime platform
        </h1>
        <h2 className="max-w-full text-xl text-center text-emerald-100">
          Track, share, and discover your favorite anime and manga with
          YourAnime😍
        </h2>
        <div className="grid grid-cols-2 mx-auto my-24 gap-y-20 gap-x-16">
          <div className="grid">
            <div>
              <h3>Discover your obsessions</h3>
              <p>
                What are your highest rated genres or most watched voice actors?
                Follow your watching habits over time with in-depth statistics.
              </p>
            </div>
          </div>
          <div className="grid">
            <div>
              <h3>Discover your obsessions</h3>
              <p>
                What are your highest rated genres or most watched voice actors?
                Follow your watching habits over time with in-depth statistics.
              </p>
            </div>
          </div>
          <div className="grid">
            <div>
              <h3>Discover your obsessions</h3>
              <p>
                What are your highest rated genres or most watched voice actors?
                Follow your watching habits over time with in-depth statistics.
              </p>
            </div>
          </div>
          <div className="grid">
            <div>
              <h3>Discover your obsessions</h3>
              <p>
                What are your highest rated genres or most watched voice actors?
                Follow your watching habits over time with in-depth statistics.
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AniList;
