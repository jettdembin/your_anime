type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <img src="/loading-anime-dance.gif" alt="Loading" />
        <div className="flex items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    </div>
  );
}
