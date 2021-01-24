import Layout from "@/components/ui/Layout";
import ChatRoom from "@/components/ChatRoom";
import CharList from "@/components/CharList";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex h-full">
        <CharList />
        <ChatRoom />
      </div>
    </Layout>
  );
};

export default withAuth(index);
