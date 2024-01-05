import { CardSectionLoader } from "@/ui/LoadingSection";
import Header from "./components/Header";

type Props = {};

export default function loading({}: Props) {
  return (
    <>
      <Header />
      <CardSectionLoader />
    </>
  );
}
