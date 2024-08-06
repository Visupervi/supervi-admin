import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import useGetUserInfo from "@/hooks/useGetUserInfo"
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout
const items = [
  {
    key: `/home`,
    icon: <HomeOutlined />,
    label: `数据概览`,
  },
  {
    key: `/article`,
    icon: <DiffOutlined />,
    label: `内容管理`,
  },
  {
    key: `/publish`,
    icon: <EditOutlined />,
    label: `发布文章`,
  }
]
const Layouts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  useGetUserInfo()
  // const [activity, setActivity] = useState("")
  const { userInfo } = useSelector(state => state.user)
  const selectKey = location.pathname
  const onMenuClickHandle = ({ key }) => {
    navigate(key)
  }

  const onConfirmHandle = async () => {
    await dispatch(clearUserInfo())
    navigate("/login")
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              onConfirm={onConfirmHandle}
              cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            onClick={onMenuClickHandle}
            selectedKeys={selectKey}
            // defaultSelectedKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Layouts