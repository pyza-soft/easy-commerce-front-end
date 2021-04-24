import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategory(
    $id: Int!
    $name: String!
    $description: String!
    $image: String!
  ) {
    updateCategory(
      id: $id
      name: $name
      description: $description
      image: $image
    ) {
      brand {
        id
        name
        description
        image
      }
    }
  }
`;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CategoryUpdateModal = ({
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
  console.log({ value });

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);

  const onFinish = (values: any) => {
    updateCategory({
      variables: {
        id: value.id,
        name: values.categoryname,
        description: values.description,
        image: values.image,
      },
    })
      .then((data) => {
        onUpdateSuccess(data.data.updateCategory.category);
      })
      .catch(() => message.error("Update Failed!", 8000));
  };

  function closeModal() {
    onHide();
  }

  return (
    <>
      <Modal
        title='Update Category Modal'
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
                categoryname: value.name,
                description: value.description,
                image: value.image,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label='Category Name'
                name='categoryname'
                rules={[
                  {
                    required: true,
                    message: "Please input your category name!",
                  },
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
                    message: "Please input your category description!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='upload'
                label='Upload'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                tooltip={false}

                // extra='Select Image'
              >
                <Upload name='logo' action='/upload.do' listType='picture'>
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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

export default CategoryUpdateModal;
