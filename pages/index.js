import Test from "../components/Test.js";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Index = () => {
  const { data, error } = useSWR("/api/state", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <Test />;
}
export default Index;
