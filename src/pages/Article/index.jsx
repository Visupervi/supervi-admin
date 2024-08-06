import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import useGetChannels from '@/hooks/useGetChannels'
import ArticleTable from "@/components/ArticleTable"
import './index.less'
import { useEffect, useRef, useState, useMemo } from 'react'
const { Option } = Select
const { RangePicker } = DatePicker
export default () => {
  const { channels } = useGetChannels();
  const [form] = Form.useForm();
  const formRef = useRef(true)
  const [payload, setPayload] = useState({
    status: '',
    channel_id: 0,
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })
  const onFinishHandle = (values) => {
    // console.log(values.date);
    setPayload({
      ...payload,
      status: values.status,
      channel_id: values.channel_id,
      begin_pubdate: values.date ? values.date[0].format("YYYY-MM-DD") : '',
      end_pubdate: values.date ? values.date[1].format("YYYY-MM-DD") : '',
    });
  }
  // useEffect(() => {
  //   if (formRef.current) {
  //     // console.log("666666")
  //     setPayload({
  //       ...payload,
  //       status: form.getFieldsValue().status,
  //       channel_id: form.getFieldsValue().channel_id,
  //       begin_pubdate: '',
  //       end_pubdate: '',
  //     })
  //     formRef.current = false;
  //     return;
  //   }
  // }, [payload.channel_id])
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/home">首页</Link>,
              },
              {
                title: "内容管理",
              }
            ]}
          >
          </Breadcrumb>
        }
      >
        <Form
          form={form}
          onFinish={onFinishHandle}
          initialValues={{ status: '', channel_id: 0 }}
        >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {
                channels.length > 0 && channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* <Card title={`根据筛选条件共查询到 count 条结果：`}> */}
      <ArticleTable payload={payload}></ArticleTable>
      {/* </Card> */}
    </div>
  )
}