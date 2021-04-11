import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Modal, Form, Input, Button, message } from "antd";

const UPDATE_BRAND_MUTATION = gql`
  mutation updateBrand($brandId: Int!, $name: String!, $description: String!) {
    updateBrand(brandId: $brandId, name: $name, description: $description) {
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

const BrandUpdateModal = ({
  show,
  onHide,
  value,
  onUpdateSuccess,
}: {
  show: boolean;
  onHide: Function;
  value: any;
  onUpdateSuccess: any;
}) => {
  const [updateBrand] = useMutation(UPDATE_BRAND_MUTATION);

  const onFinish = (values: any) => {
    updateBrand({
      variables: {
        brandId: 123,
        name: values.brandname,
        description: values.description,
      },
    })
      .then((data) => {
        onUpdateSuccess(data.data.updateBrand.brand);
      })
      .catch(message.error("Update Failed!", 8000));
  };

  function closeModal() {
    onHide();
  }

  return (
    <>
      <Modal
        title='Update Brand Modal'
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
              initialValues={{
                brandname: value.Name,
                description: value.Description,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label='Brand Name'
                name='brandname'
                rules={[
                  { required: true, message: "Please input your brand name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Description'
                name='description'
                rules={[
                  {
                    required: true,
                    message: "Please input your brand description!",
                  },
                ]}
              >
                <Input />
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

export default BrandUpdateModal;
