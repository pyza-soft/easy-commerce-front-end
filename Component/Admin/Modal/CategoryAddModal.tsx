import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory(
    $name: String!
    $description: String!
    $image: String!
  ) {
    createCategory(name: $name, description: $description, image: $image) {
      categories {
        id
      }
    }
  }
`;

const CategoryAddModal = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: Function;
}) => {
  const { handleSubmit } = useForm();
  const [name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [createCategory, { data }] = useMutation(CREATE_CATEGORY_MUTATION);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    createCategory({
      variables: {
        name,
        description,
        image,
      },
    }).then((data) => {
      console.log(data);
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
            <form onSubmit={handleSubmit(onSubmit)} className='login-warp mt-3'>
              <Input
                name='name'
                type='text'
                placeholder='Category Name'
                className='form-control'
                id='title'
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />

              <Input
                name='description'
                type='text'
                className='form-control mt-2'
                id='description'
                placeholder='Category Description'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <Input
                name='image'
                type='file'
                className='form-control mt-2'
                id='image'
                placeholder='Select Image'
                // onChange={(e) => setImage(e.target.files)}
              />

              <div className='d-flex justify-content-center pt-3'>
                <Button htmlType='submit' className='pr-5 pl-5'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CategoryAddModal;
