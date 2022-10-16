
import { Button, Card, Space, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { useReducer } from 'react';

const user_Delete_alert = () =>{
    notification.open({
      message: 'Users',
      description:
        'User Deleted Successfully',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

function Users() {

    const [users1, setUsers] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "Users" });
            console.log(res.data);
            setUsers(res.data);
        };
        getData();
    }, [ignored]);

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
                    <Button type="danger" shape="round" onClick={()=> deleteData(record.id)}>Delete</Button>
                    <Button type="success" shape='round' onClick={()=> deleteData(record.id)}>Edit</Button>
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
                title={"Admins"+" : "+ users1.length}
                extra={
                    <Space size="middle">
                        <Button type='primary'href='/add new user'>Add New User</Button>
                    </Space>}
            >
                <Table bordered columns={columns} dataSource={data} style={{ margin: "1%" }} /></Card>
        </>
    );
}

export default Users;
