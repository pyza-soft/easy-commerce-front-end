import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Input, Button } from "antd";

const login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="form-group">
        <Col xs={20} sm={4} md={6} lg={8} xl={4}>
          <label htmlFor="title">Username</label>
          <input
            ref={register({ required: true })}
            name="title"
            type="text"
            className="form-control"
            id="title"
          />
        </Col>
      </Row>

      <Row className="form-group">
        <Col xs={20} sm={4} md={6} lg={8} xl={4}>
          <label htmlFor="title">Password</label>
          <input
            ref={register({ required: true })}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </Col>
      </Row>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default login;
