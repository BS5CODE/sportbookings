import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Form from "../components/Form";
import BookingCalendar from "../components/BookingCalendar";
import Schedule1 from "../components/Schedule1";
import { Input } from "antd";
const home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-1/6 bg-white shadow-md z-10">
        <Sidebar />
      </div>
      <div className="ml-[16.666667%] p-5 pt-3 pb-2 w-[83.333333%]">
        <div className="mt-4">
          <hr />
        </div>
        {/* <BookingCalendar /> */}
        <Schedule1 />
      </div>
    </div>
  );
};

export default home;
