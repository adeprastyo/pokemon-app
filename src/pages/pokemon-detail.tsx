import Layout from "@/components/layout";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { name } = useParams();
  return (
    <Layout>
      <div>{name}</div>
    </Layout>
  );
}
