import axios from "axios";
import React from "react";

const Dashboard = (): JSX.Element => {
  const users = ["user1", "user2", "user3", "user4", "user5", "user6"];
  return (
    <div className="flex">
      <section className="bg-white border-r-2 border-gray-300 p-2">
        Profile Section
      </section>
      Users Section
      <section className="bg-white flex flex-wrap flex-1 justify-center items-center p-2">
        {users.map((elem) => (
          <div className=" border-gray-300 border-1 rounded-md text-center p-2">
            {elem}
          </div>
        ))}
      </section>
      hello world
    </div>
  );
};

export default Dashboard;
