import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useFridgesQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";
const Index = () => {
  const [{ data }] = useFridgesQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.fridges.map((f) => <div key={f.id}>{f.title}</div>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
