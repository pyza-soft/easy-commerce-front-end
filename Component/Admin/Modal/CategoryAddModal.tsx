import React, { useState } from "react";
import { Form, Modal, Button, Input, message, Upload } from "antd";
import { gql, useMutation } from "@apollo/client";
import { UploadOutlined } from "@ant-design/icons";

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory(
    $name: String!
    $description: String!
    $image: String!
  ) {
    createCategory(name: $name, description: $description, image: $image) {
      category {
        id
        name
        description
        image
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

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const CategoryAddModal = ({
  show,
  onHide,
  onCreateSuccess,
}: {
  show: boolean;
  onHide: Function;
  onCreateSuccess: any;
}) => {
  const [name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [createCategory, { data }] = useMutation(CREATE_CATEGORY_MUTATION);

  const onFinishSubmit = () => {
    createCategory({
      variables: {
        name,
        description,
        image,
      },
    }).then((data) => {
      console.log(data);
      onCreateSuccess(data.data.createCategory.category);
    });

    onHide();
  };

  function closeModal() {
    onHide();
  }

  return (
    <>
      <Modal
        title='Add Category Modal'
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
              className='login-warp mt-3'
              initialValues={{ remember: true }}
              onFinish={onFinishSubmit}
            >
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  { required: true, message: "Please input category name!" },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Description'
                name='description'
                rules={[
                  {
                    required: true,
                    message: "Please input category description!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
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

              <div className='d-flex justify-content-center pt-3'>
                <Button htmlType='submit' className='pr-5 pl-5'>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
