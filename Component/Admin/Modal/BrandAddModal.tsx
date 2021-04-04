import React, { useState } from "react";
import { Modal, Button } from "antd";

const BrandAddModal = (show: any, onHide: any) => {
  // const handleOk = () => hide(false);
  // const handleCancel = () => hide(false);

  function closeModal() {
    onHide();
  }
  return (
    <>
      <Modal
        title='Basic Modal'
        visible={show}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default BrandAddModal;
