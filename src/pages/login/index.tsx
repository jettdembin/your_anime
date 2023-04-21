import React, { useState } from "react";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (): void => {
    setLoginInfo({});
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <header>
        <h1> Sign into YourAnime</h1>
      </header>
      <main className="p-40  rounded-md shadow-2xl">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="bg-transparent">
            Email:
            <input className="ml-2 border border-black" type="email" />
          </label>
          <label>
            Password:
            <input type="password" className="border border-black ml-2" />
          </label>
        </form>
      </main>
    </div>
  );
};

export default Login;
