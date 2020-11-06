import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useFridgesQuery } from "../generated/graphql";
const Index = () => {
  const [{ data }] = useFridgesQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.fridges.map((f) => <div key={f.id}>{f.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
