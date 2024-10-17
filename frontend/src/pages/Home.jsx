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
        <div className="flex items-center">
          <Input
            type="text"
            className="p-1.5 border-2 border-slate-200 rounded-md w-[70%] shadow"
            placeholder="Type a command or search"
          />
          <div className="w-[30%] mx-2 ">
            <button className="rounded-md bg-slate-200 p-2 px-3 text-sm font-semibold mr-2">
              Dummy
            </button>
            <Button
              iconPosition="start"
              onClick={showModal}
              icon={<PlusOutlined />}
            >
              Book Ground
            </Button>
            <Modal
              title="Book Ground"
              open={isModalOpen}
              footer={null}
              onOk={handleOk}
              onCancel={handleCancel}
              destroyOnClose={true}
            >
              <Form />
            </Modal>
          </div>
        </div>
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
