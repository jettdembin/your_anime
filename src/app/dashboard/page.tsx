const getAccountData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/getAccountData`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log(res);
  }
  return res.json();
};

export default async function Dashboard() {
  const data = await getAccountData();
  const { userData } = data;
  const { likes } = userData;
  console.log(data, "UserDatsa");
  console.log(likes, "LIKEA");
  console.log("TESTETJ");

  return (
    <div>
      <div key={userData.id}>
        <h1>{userData.name}</h1>
        {/* Render other user details */}
      </div>

      {likes?.map((like) => (
        <div key={like.id}>
          <p>Like Title: {like.title}</p>
          {/* Render other like details */}
        </div>
      ))}
    </div>
  );
}
