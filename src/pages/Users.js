
import { Button, Card, Space, notification, Typography, Modal, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { useReducer } from 'react';
import { Option } from 'antd/lib/mentions';

const user_Delete_alert = () => {
    notification.open({
        message: 'Users',
        description:
            'User Deleted Successfully',
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}
const alert1 = () =>{
    notification.open({
      message: 'Add User',
      description:
        'Account Created Successfully',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  const alert2 = () =>{
    notification.open({
      message: 'Add User',
      description:
        'System Error please try later..',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        var axios = require('axios');
  
      var data = JSON.stringify({
        "action": "AddUser",
        "parameters": {
          "firstname": document.getElementById('firstname').value,
          "lastname": document.getElementById('lastname').value,
          "username": document.getElementById('username').value,
          "email": document.getElementById('email').value,
          "password": document.getElementById('password').value,
          "accesslvl": select
        }
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:5000/index',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(response);
        if(response.data===true){
          alert1();
          setIsModalOpen(false);
          forceUpdate();
          //window.location.replace('/sign-in');
        }else{
         alert2();
         setIsModalOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
        
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [users1, setUsers] = useState([]);
    const [select, setSelect] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "Users" });
            console.log(res.data);
            setUsers(res.data);
        };
        getData();
    }, [ignored]);

    const handleChange = (value) => {
        console.log((value.value));
        setSelect(value.value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        //console.log(select)
    };

    const deleteData = async (id) => {
        var axios = require('axios');

        var data = JSON.stringify({
            "action": "DeleteUser",
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
            .then(function (response) {
                console.log(response);
                user_Delete_alert();
                forceUpdate();
                //navigate('/login', { replace: true });
                //console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    const columns = [

        {
            title: 'First Name',
            dataIndex: 'firstname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
        },
        {
            title: 'Username',
            dataIndex: 'username',

        },

        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'password'
        },
        {
            title: 'Access',
            dataIndex: 'accesslvl',
            filters: [
                {
                    text: 'Admin',
                    value: 'Admin'
                },
                {
                    text: 'User',
                    value: 'User'
                }
            ],
            onFilter: (value, record) => record.accesslvl.startsWith(value),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link onClick={() => deleteData(record.id)}>Delete</Typography.Link>
                    <Typography.Link onClick={() => deleteData(record.id)}>Edit</Typography.Link>
                </Space>

            ),
        }

    ];
    const data = users1
    return (
        <>
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title={"Admins:  " + users1.length}
                extra={
                    <Space size="middle">
                        <a href='#'><Button type='primary' onClick={showModal} >Add New User</Button></a>
                    </Space>}
            >
                <Table bordered columns={columns} dataSource={data} style={{ margin: "1%" }} /></Card>
            <Modal title="Add New User" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form
                name="basic"
                initialValues={{ remember: false }}
                className="row-col"
                layout="vertical"
              >
                <Form.Item
                  name="firstname"
                  label="First Name"
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                  ]}
                >
                  <Input placeholder="Enter Firstname" id="firstname" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                  ]}
                >
                  <Input placeholder="Enter Lastname" id="lastname" />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter Usernanme" id="username" />
                </Form.Item>
                <Form.Item
                  className="email"                
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {type: "email", message: "Email you entered is not correct!"}
                  ]}
                >
                  <Input placeholder="email" id="email" />
                </Form.Item>
                <Form.Item
                  className="password"
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!"},
                  ]}
                >
                  <Input placeholder="Enter Password" id="password" />
                </Form.Item>
                <Form.Item label="Access Level"
                    name="Access Level"
                    >
                        <Select
                            labelInValue
                            defaultValue={{
                                value: '',
                                label: 'Select Access',
                            }}
                            onChange={handleChange}
                        >
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
                        </Select>
                    </Form.Item>
              </Form>
            </Modal>
        </>
    );
}

export default Users;
