import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

// createBrand(description: Stringname: String): CreateBrand

const CREATE_BRAND_MUTATION = gql`
  mutation createBrand($brandName: String!, $description: String!) {
    createBrand(brandName: $brandName, description: $description) {
      id
    }
  }
`;

const BrandAddModal = ({
  show,
  onHide,
}: {
  show: boolean;
  onHide: Function;
}) => {
  const { handleSubmit } = useForm();
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [createBrand, { data }] = useMutation(CREATE_BRAND_MUTATION);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    createBrand({
      variables: {
        brandName: brandName,
        description: description,
      },
    }).then((data) => {
      console.log(data);
    });
  };

  function closeModal() {
    onHide();
  }

  return (
    <>
      <Modal
        title='Brand Modal'
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
                placeholder='Brand Name'
                className='form-control'
                id='title'
                onChange={(e) => {
                  setBrandName(e.target.value);
                }}
              />

              <Input
                name='description'
                type='text'
                className='form-control mt-2'
                id='description'
                placeholder='Brand Description'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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

export default BrandAddModal;
