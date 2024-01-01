import SignUpWrapper from "@/app/components/SignUpWrapper";

export default async function SignUpToYourAnime() {
  return (
    <div className="overflow-hidden">
      <div className="fixed w-screen h-screen top-0 left-0 bg-gray-600 z-10 opacity-75"></div>
      <div className="fixed w-screen h-screen z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <SignUpWrapper />
      </div>
    </div>
  );
}
