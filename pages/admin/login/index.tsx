import { useForm } from "react-hook-form";
import { Row, Col, Input, Checkbox, Button, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";

const login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div className='d-flex justify-content-center flex-column'>
        <Image
          width={50}
          src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
        />
        <h1 className='p-0 text-color'>Easy Commerce</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='login-warp'>
          <Row>
            <Col
            // xs={{ span: 5, offset: 1 }}
            // lg={{ span: 6, offset: 2 }}
            // sm={{ span: 12, offset: 1 }}
            >
              <Input
                name='title'
                type='text'
                placeholder='admin'
                className='form-control'
                id='title'
                prefix={<UserOutlined />}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              <Input
                name='password'
                type='password'
                className='form-control'
                id='password'
                placeholder='password'
                prefix={<LockOutlined />}
              />
            </Col>
          </Row>

          <div>
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
          <Button type='primary'>Login</Button>
        </form>
      </div>
    </div>
  );
};

export default login;
