import { useForm } from "react-hook-form";
import { Row, Col, Input, Checkbox, Button, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import { gql, useMutation } from '@apollo/client';

const TOKEN_AUTH = gql`
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const login = () => {
  const { register, handleSubmit } = useForm();
  const [tokenAuth, { data }] = useMutation(TOKEN_AUTH);
  console.log(data);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    tokenAuth({
      variables: {
        username: 'admin',
        password: "1",
      }
    }).then((data) => {
      console.log(data);
    })
  };

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div className='d-flex justify-content-center flex-row mt-5'>
        <Image
          width={50}
          src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          className='pr-2'
        />
        <h1 className='p-0 text-color'>Easy Commerce</h1>
      </div>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='login-warp mt-3'>
          <Input
            name='title'
            type='text'
            placeholder='admin'
            className='form-control'
            id='title'
            prefix={<UserOutlined />}
          />

          <Input
            name='password'
            type='password'
            className='form-control mt-2'
            id='password'
            placeholder='password'
            prefix={<LockOutlined />}
          />

          <div className='mt-2 mb-3'>
            <Checkbox
            // checked={this.state.autoLogin}
            // onChange={this.changeAutoLogin}
            >
              Keep me logged in
            </Checkbox>
            <a style={{ float: "right" }} href=''>
              Forgot password
            </a>
          </div>
          <div className='d-flex justify-content-center'>
            <Button htmlType="submit" className='pr-5 pl-5'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
