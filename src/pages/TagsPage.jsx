import { Button, Col, Form, Input, Row, Select, Tooltip } from 'antd';
import React, { useContext, useEffect, } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { TagsContext } from '../contexts/DataContext';
import _ from 'lodash';
import { useForm } from 'antd/es/form/Form';

const TagsPage = () => {
  const { tags, setTags } = useContext(TagsContext)
  const [form] = useForm();

  // const [tagsToUpdate, setTagsToUpdate] = useState(new Set)

  const handleAddTag = () => {
    const label = `Tag #${tags.length + 1}`
    setTags([...tags, { label, filters: [] }])
  }

  const handleDeleteTag = (index) => () => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  // const handleUpdateTag = (tag, index) => async () => {
  const handleUpdateTag = async () => {
    console.log('handleUpdateTag');

    const values = await form.getFieldsValue()

    const newTags = tags.map((tag, index) => {
      const label = values[index + 'label']
      const filters = values[index + 'filters']
      return ({ ...tag, label, filters })
    })

    console.log({ values, tags, newTags })
    setTags(newTags);
  }

  useEffect(() => {
    let values = {}
    tags.forEach((tag, index) => {
      values[index + 'label'] = tag.label;
      values[index + 'filters'] = tag.filters;
    })

    form.setFieldsValue(values)
  }, [tags])

  console.log('tags', tags);

  return (
    <>
      <h1>Tags</h1>
      <div className='tags__controls'>
        <div>
          <Button onClick={handleAddTag}>Add</Button>
        </div>
        <div>
          <Button type='primary' onClick={handleUpdateTag}>Confirm</Button>
        </div>
      </div >
      <Form
        form={form}
        layout='vertical'
        name="basic"
        autoComplete="off">
        <div className='tags__container'>
          {tags.map((tag, index) => (

            <Row className='tag__content' key={index}
              // align={'start'}
              gutter={10}>
              <Col span={4}>
                <h3 style={{ margin: '0' }}>{tag.label}</h3>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={index + 'label'}
                  value={tag.label}
                >
                  <Input
                    value={tag.label} placeholder={'Name'} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={index + 'filters'}
                  value={tag.filters}
                >
                  <Select
                    mode="tags"
                    placeholder="Filters"
                    value={tag.filters}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Tooltip title="Remove">
                  <Button onClick={handleDeleteTag(index)} icon={<DeleteOutlined />} />
                </Tooltip>
              </Col>
            </Row>))}
        </div>
      </Form >
    </>
  )
}
export default TagsPage;