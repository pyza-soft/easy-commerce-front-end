import React, { useState } from "react";
import { Form, Modal, Button, Input, message } from "antd";
import { gql, useMutation } from "@apollo/client";

const CREATE_BRAND_MUTATION = gql`
  mutation createBrand($name: String!, $description: String!) {
    createBrand(name: $name, description: $description) {
      brand {
        id
        name
        description
      }
    }
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BrandAddModal = ({
  show,
  onHide,
  onCreateSuccess,
}: {
  show: boolean;
  onHide: Function;
  onCreateSuccess: any;
}) => {
  const [name, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [createBrand] = useMutation(CREATE_BRAND_MUTATION);

  const onFinishSubmit = () => {
    createBrand({
      variables: {
        name,
        description,
      },
    })
      .then((data) => {
        onCreateSuccess(data.data.createBrand.brand);
      })
      .catch(() => message.error("Failed To Add Data!"));

    onHide();
  };

  function closeModal() {
    onHide();
  }

  return (
    <>
      <Modal
        title='Add Brand Modal'
        visible={show}
        onOk={closeModal}
        onCancel={closeModal}
        keyboard={false}
        footer={null}
      >
        <div className='d-flex justify-content-center flex-column'>
          <div className='d-flex justify-content-center'>
            <Form
              {...layout}
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinishSubmit}
            >
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  { required: true, message: "Please input brand name!" },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setBrandName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Description'
                name='description'
                rules={[
                  {
                    required: true,
                    message: "Please input brand description!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BrandAddModal;
