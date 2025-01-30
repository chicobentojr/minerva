import { Button, Form, Input } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';

import { TagsContext } from '../contexts/DataContext';
import _ from 'lodash';
import { useForm } from 'antd/es/form/Form';

const TagsPage = () => {

  const { tags, setTags } = useContext(TagsContext)

  const [form] = useForm();

  const handleAddTag = () => {
    const label = `Tag #${tags.length + 1}`

    setTags([...tags, { label, match: '' }])
  }

  const handleUpdateTag = (tag, index) => async () => {

    const values = await form.getFieldsValue()
    const label = values[index + 'label']
    const match = values[index + 'match'] || label.toLowerCase()



    const newTags = tags.map((t, idx) => {
      if (index === idx) {
        return { label, match }
      } else {
        return t
      }
    })

    console.log({ tag, values, tags, newTags })

    setTags(newTags);
    // form.resetFields();
    // updateInitialValues();
  }

  useEffect(() => {
    let values = {}
    tags.forEach((tag, index) => {
      values[index + 'label'] = tag.label;
      values[index + 'match'] = tag.match;
    })

    form.setFieldsValue(values)
  }, [tags])


  console.log({ tags, form });

  return (
    <>
      <h1>Tags</h1>

      <Form
        form={form}
        layout='vertical'
        name="basic"
        // initialValues={}
        autoComplete="off">
        <div className='tags__container'>
          {tags.map((tag, index) => (

            <div key={index} className='tag__content'>
              <h3>{tag.label}</h3>
              <Form.Item
                name={index + 'label'}
                value={tag.label}
              >
                {/* <Input onInput={updateTagField(tag, 'label')} placeholder={'Name'} /> */}
                <Input value={tag.label} placeholder={'Name'} />
              </Form.Item>
              <Form.Item
                name={index + 'match'}
                value={tag.label}
              >
                <Input placeholder={'Match'} />
              </Form.Item>
              <Button color='primary' variant='dashed' onClick={handleUpdateTag(tag, index)}>Update</Button>
            </div>))}
        </div>
        <br />
        <Button type='primary' onClick={handleAddTag}>Add</Button>
      </Form >
    </>
  )
}
export default TagsPage;