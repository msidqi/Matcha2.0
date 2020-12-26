import Layout from "@/components/ui/Layout";
import ChatRoom from "@/components/ChatRoom";
import CharList from "@/components/CharList";

const Messages = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex ">
        <CharList />
        <ChatRoom />
      </div>
    </Layout>
  );
};

export default Messages;
