import UserData from "../../UserData";

type Props = {};

export default function Main({}: Props) {
	return (
		<div className="container m-auto">
			<UserData data={userData} />
		</div>
	);
}
