import Layout from "@/components/ui/Layout";
import ChatRoom from "@/components/ChatRoom";
import ChatList from "@/components/ChatList";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex h-full">
        {/* open chatroom when clicking on specific user in chatlist */}
        {/* add events for sending messages and on recieving messages */}
        {/* add loading of old messages */}
        <ChatList />
        <ChatRoom />
      </div>
    </Layout>
  );
};

export default withAuth(index);
