import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import GeekEditor from '@/components/GeekEditor';
import useGetChannels from '@/hooks/useGetChannels';
import "./index.less";
import { getArticleDetail, saveArticles } from '@/apis/articles';
import { useEffect, useMemo, useState } from 'react';
const { Option } = Select
export default () => {
  const [form] = Form.useForm();
  const { channels } = useGetChannels();
  const [imageList, setImageList] = useState([]);
  const [maxCount, setMaxCount] = useState(0)
  const [text, setText] = useState("")
  const [routeParam] = useSearchParams()
  const navigate = useNavigate()
  // console.log("channelschannelschannels",channels)
  const onFinish = async (values) => {
    // console.log("onFinish", values);
    const { title, content, channel_id } = values
    if (maxCount !== imageList.length) return message.warning("封面图片与封面类型不相符");
    const reqParams = {
      title,
      content,
      channel_id,
      cover: {
        type: maxCount,
        images: imageList.map(item => item.response.data.url)
      }
    }

    const { data } = await saveArticles(reqParams)
    // console.log("res", res.data.message);
    if (data.message === 'OK') {
      if(routeParam.get("id")) {
        message.success("文章修改成功！")
        navigate(-1)
      } else {
        message.success("文章添加成功！")
      }
      form.resetFields()
      setImageList([])
    }
    // 处理表单数据
  }

  const onchangeHandle = (value) => {
    // console.log("value", value);
    setImageList(value.fileList);
  }
  // 切换上传类型
  const radioChangeHandle = (value) => {
    // console.log("value", value.target.value);
    setMaxCount(value.target.value)
  }
  // 回填数据
  const getDetail = async (id) => {
    const { data: { data } } = await getArticleDetail(id)
    // console.log("data", data)
    form.setFieldsValue({
      ...data,
      type: data.cover.type
    })
    setMaxCount(data.cover.type)
    setText(data.content)
    setImageList(data.cover.images.map(url => {
      return {
        url
      }
    }))
  }
  useEffect(() => {
    const id = routeParam.get('id')
    if (id) {
      getDetail(id)
    }
  }, [])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: <Link to="/home">首页</Link>,
              },
              {
                title: routeParam.get('id') ? "文章编辑" :"发布文章",
              }
            ]}
          >
            {/* <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item> */}
          </Breadcrumb>
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '', type: 0 }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                channels.length > 0 && channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChangeHandle}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {maxCount > 0 && (
              <Upload
                name="image"
                onChange={onchangeHandle}
                listType="picture-card"
                className="avatar-uploader"
                fileList={imageList}
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                maxCount={maxCount}
                multiple={maxCount > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {useMemo(() => {
              return <GeekEditor
                className="publish-quill"
                text={text}
                placeholder="请输入文章内容"
              />
            }, [text])}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}