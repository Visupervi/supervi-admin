import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Tag, Space, Card, Button, Form, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { STATUS } from '@/constant/status'
import img404 from '@/assets/errors.jpeg'
import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteArticle, getArticleList } from '@/apis/articles'
import { isEqual } from 'lodash';

const ArticleTable = ({ payload }) => {
  const [articleList, setArticleList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(payload.page)
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => STATUS[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{navigate(`/publish?id=${data.id}`)}} />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章么?"
              onConfirm={() => confirmHandle(data)}
              onCancel={() => { }}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const getList = useCallback(async (params) => {
    setLoading(true)
    const { data: { data: { results, total_count } } } = await getArticleList({
      ...params,
      page: currentPage
    })
    setArticleList(results)
    setTotal(total_count)
    setLoading(false)
  }, [payload, currentPage])

  const pageChangeHandle = page => {
    setCurrentPage(page)
  }

  const confirmHandle = async (item) => {
    const { data } = await deleteArticle(item.id)
    if(data.message === 'OK') {
      message.success("删除成功！")
    }
    getList(payload)
    // console.log("res", message)
  }
  useEffect(() => {
    getList(payload)
  }, [payload, currentPage])

  return (
    <div>
      <Card title={`根据筛选条件共查询到 ${total} 条结果：`}>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          pagination={{
            total: total,
            pageSize: payload.per_page,
            onChange: pageChangeHandle
          }}
          dataSource={articleList} />
      </Card>
    </div>
  )
}

export default React.memo(ArticleTable);