import React from "react"
import { Card, Form, Input, Button, Checkbox, message } from "antd"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "@/store/modules/user"
import logo from "@/assets/react.svg"
import "./index.less"
export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await dispatch(login(values))
    navigate("/")
    message.success("登陆成功!")
    // console.log("values", values)
  }
  return (
    <div className="login">
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" src={logo} alt="" />
          {/* 登录表单 */}
          <Form
            validateTrigger={['onBlur', 'onChange']}
            onFinish={onFinish}
          >
            <Form.Item
              name="mobile"
              rules={[
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号码格式不对',
                  validateTrigger: 'onBlur'
                },
                { required: true, message: '请输入手机号' }
              ]}
            >
              <Input size="large" placeholder="请输入手机号" />
            </Form.Item>
            {/* 246810固定验证码 */}
            <Form.Item
              name="code"
              rules={[
                { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
                { required: true, message: '请输入验证码' }
              ]}
            >
              <Input size="large" placeholder="请输入验证码" maxLength={6} />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="login-checkbox-label">
                我已阅读并同意「用户协议」和「隐私条款」
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

    </div >
  )
}
