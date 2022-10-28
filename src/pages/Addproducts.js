import { Button, Form, Input, Radio, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import { notification } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { Option } = Select;


const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

function Addproducts() {
    const [checkbox, setValue] = useState("No");
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState("");
    const [TextArea, setTextArea] = useState('');

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "CategoriesSelect" });
            console.log(res.data);
            setCategories(res.data);
        };
        getData();
    }, []);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const handleChange = (value) => {
        console.log((value.value));
        setSelect(value.value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        //console.log(select)
    };
    const addprod_notify = () =>{
        notification.open({
          message: 'Product Status',
          description:
            'Product Added successfully',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
      const addprod_notify_err = () =>{
        notification.open({
          message: 'Product Status',
          description:
            'Something went wrong, please try again later',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }

      const addprod_notify_err_submit = () =>{
        notification.open({
          message: 'Missing Fields',
          description:
            'Please Fill out the fields below and try again',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }

     

    const addProduct = async () => {
        if (document.getElementById('title').value === ''|| select === ''){
            addprod_notify_err_submit();
            await sleep(1500);
        }else{
        var axios = require('axios');
        var data = JSON.stringify({
            "action": "Addproduct",
            "parameters": {
                "prod_name": document.getElementById("title").value,
                "prod_desc": TextArea===''?"No Description Availabe": TextArea,
                "prod_cat": select,
                "prod_feat": checkbox
            }
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/index',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(async function (response) {
                var res = response.data;
                if(res.protocol41===true){
                   addprod_notify();
                   await sleep(1500);
                   window.location.reload();


                }else{
                    addprod_notify_err();
                    await sleep(1500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }}
    
    return (
        <>
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Product Details"
            >
                <Form
                    layout="vertical"
                    style={{ margin: "1%" }}
                >
                    <Form.Item label="Heading / Title"
                    name="Heading / Title"
                    >
                        <Input placeholder="Write the name of the product" name="title" id="title" />
                    </Form.Item>
                    <Form.Item label="Featured Product">
                        <Radio.Group onChange={onChange} value={checkbox}>
                            <Radio value={'No'}>No</Radio>
                            <Radio value={'Yes'}>Yes</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Product Category"
                    name="Product Category"
                    >
                        <Select
                            labelInValue
                            defaultValue={{
                                value: '',
                                label: 'Select Category',
                            }}
                            onChange={handleChange}
                        >
                            {categories.map((data) => {
                                return <>
                                    <Option value={data.name}>{data.name}</Option>
                                </>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                    <ReactQuill theme="snow" value={TextArea} onChange={setTextArea} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={addProduct}>Submit</Button>
                    </Form.Item>
                </Form></Card>
        </>
    );
}

export default Addproducts;
