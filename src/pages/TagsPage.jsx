import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react';

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

  // const handleUpdateTag = (tag, index) => async () => {
  const handleUpdateTag = async () => {
    console.log('handleUpdateTag');

    const values = await form.getFieldsValue()

    const newTags = tags.map((t, index) => {
      const label = values[index + 'label']
      const filters = values[index + 'filters']
      return ({ label, filters })
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

  console.log({ tags });

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
              align={'middle'}
              gutter={10}>
              <Col span={4}>
                <h3>{tag.label}</h3>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={index + 'label'}
                  value={tag.label}
                >
                  <Input
                    value={tag.label} placeholder={'Name'} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name={index + 'filters'}
                  value={tag.filters}
                >
                  <Select
                    mode="tags"
                    // style={{ width: '100%' }}
                    placeholder="Filters"
                    value={tag.filters}
                  />
                </Form.Item>
              </Col>
            </Row>))}
        </div>
      </Form >
    </>
  )
}
export default TagsPage;