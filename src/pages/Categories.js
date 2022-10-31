import { Button, Card, Space, Table, notification, Typography, Modal, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import { Option } from 'antd/lib/mentions';



const deleteAlert = () => {
    notification.open({
        message: 'Category',
        description:
            'Category Deleted Successfully',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}

const addAlert = () => {
    notification.open({
        message: 'Category',
        description:
            'Category Added Successfully',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}

const errorAlert = () => {
    notification.open({
        message: 'Category',
        description:
            'Something went wrong, try again later',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}

const editAlert = () => {
    notification.open({
        message: 'Category',
        description:
            'Category edited successfully',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}

function Categories() {


    const [cat, setCat] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [select, setSelect] = useState('');
    const [newSelect, setNewSelect] = useState('');
    const [catname, setCatName] = useState('');
    const [ID, setID] = useState('');

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "CategoriesSelect" });
            console.log(res.data);
            setCat(res.data);
        };
        getData();
    }, [ignored]);

    const setData = (data) =>{
        let{id, name, status} = data;
        setID(id);
        setCatName(name);
        setNewSelect(status);
        setIsEditModalOpen(true);
    }

    const deleteData = async (id) => {
        var axios = require('axios');

        var data = JSON.stringify({
            "action": "DeleteCategory",
            "parameters": {
                "id": id,
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
                console.log(response);
                deleteAlert();
                forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);

    };

    const handleChange = (value) => {
        console.log((value.value));
        setSelect(value.value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        //console.log(select)
    };

    const handleChangeEditSelect = (value) => {
        console.log((value.value));
        setNewSelect(value.value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        //console.log(select)
    };

    const handleOk = () => {

        var axios = require('axios');
        var data = JSON.stringify({
            "action": "AddCategory",
            "parameters": {
                "name": document.getElementById('categoryname').value,
                "status": select
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
            .then(function (response) {
                console.log(response);
                if (response.data === true) {
                    addAlert();
                    setIsModalOpen(false);
                    forceUpdate();
                } else {
                    errorAlert();
                    setIsModalOpen(false);
                    forceUpdate();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleOkEdit = () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "action": "EditCategory",
            "parameters": {
                "id": ID,
                "name": catname,
                "status": newSelect
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
            .then(function (response) {
                console.log(response);
                if (response.data === true) {
                    editAlert();
                    setIsEditModalOpen(false);
                    forceUpdate();
                } else {
                    errorAlert();
                    setIsModalOpen(false);
                    forceUpdate();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const columns = [

        {
            title: 'Name',
            dataIndex: 'name',
            //ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={() => deleteData(record.id)}>Delete</Typography.Link>
                    <Typography.Link onClick={() => setData(record)}>Edit</Typography.Link>
                </Space>

            ),
        }

    ];
    const data = cat

    return (
        <>

            <Card
                bordered={true}
                className="criclebox tablespace mb-24"
                title={"Total Categories:  " + cat.length}
                extra={
                    <Space size="middle"><a><Button type='primary' onClick={showModal}>Add New Category</Button></a></Space>}
            >
                <Table columns={columns} dataSource={data} style={{ margin: "1%" }} bordered /></Card>

            <Modal title="Add New Category" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    initialValues={{ remember: false }}
                    className="row-col"
                    layout="vertical"
                >
                    <Form.Item
                        name="categoryname"
                        label="Category Name"
                        rules={[
                            { required: true, message: "Please input your category name!" },
                        ]}
                    >
                        <Input placeholder="Enter Category name" id="categoryname" />
                    </Form.Item>
                    <Form.Item label="Status"
                        name="status"
                    >
                        <Select
                            labelInValue
                            defaultValue={{
                                value: '',
                                label: 'Select Status',
                            }}
                            onChange={handleChange}
                        >
                            <Option value="Approved">Approved</Option>
                            <Option value="notApproved">notApproved</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Edit Category" visible={isEditModalOpen} onOk={handleOkEdit} onCancel={handleCancel}>
                <Form
                    name="basic"
                    initialValues={{ remember: false }}
                    className="row-col"
                    layout="vertical"
                    fields={[
                        {
                            name: "categoryname",
                            value: catname
                        }
                    ]}
                >
                    <Form.Item
                        name="categoryname"
                        label="Category Name"
                        rules={[
                            { required: true, message: "Please input your category name!" },
                        ]}
                    >
                        <Input placeholder="Enter Category name" id="categoryname" onChange={(e)=>setCatName(e.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Status"
                        name="status"
                    >
                        <Select
                            labelInValue
                            defaultValue={{
                                value: newSelect,
                                label: newSelect,
                            }}
                            onChange={handleChangeEditSelect}
                        >
                            <Option value="Approved">Approved</Option>
                            <Option value="notApproved">notApproved</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
}

export default Categories;
