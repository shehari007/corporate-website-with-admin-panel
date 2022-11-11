
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
const alert1 = () => {
  notification.open({
    message: 'Add User',
    description:
      'Account Created Successfully',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const alert2 = () => {
  notification.open({
    message: 'Add User',
    description:
      'System Error please try later..',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const alert3 = () => {
  notification.open({
    message: 'Edit User',
    description:
      'User details edited successfully',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const alert4 = () => {
  notification.open({
    message: 'Add User',
    description:
      'Please fill out the empty fields',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [id, setID] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newselect, setNewSelect] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleOk = () => {

    var fname = document.getElementById('firstname').value
    var lname = document.getElementById('lastname').value
    var uname = document.getElementById('username').value
    var email = document.getElementById('email').value
    var pass = document.getElementById('password').value

    //console.log(test)
    if (fname === '' || lname === '' || uname === '' || email === '' || pass === '' || select === '') {
      alert4();
    }
    else {

      var axios = require('axios');

      var data = JSON.stringify({
        "action": "AddUser",
        "parameters": {
          "firstname": fname,
          "lastname": lname,
          "username": uname,
          "email": email,
          "password": pass,
          "accesslvl": select
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
            alert1();
            setIsModalOpen(false);
            forceUpdate();
          } else {
            alert2();
            setIsModalOpen(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleOkEdit = () => {
    var axios = require('axios');

    var data = JSON.stringify({
      "action": "EditUser",
      "parameters": {
        "id": id,
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "accesslvl": newselect
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
          alert3();
          setIsEditModalOpen(false);
          forceUpdate();
          //window.location.replace('/sign-in');
        } else {
          alert2();
          setIsEditModalOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);

  };

  const [users1, setUsers] = useState([]);
  const [select, setSelect] = useState('');
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

  const handleChangeEdit = (value) => {
    console.log((value.value));
    setNewSelect(value.value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
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
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const setData = (data) => {
    let { id, firstname, lastname, username, email, password, accesslvl } = data;
    setID(id);
    setFirstname(firstname);
    setLastname(lastname);
    setUsername(username);
    setPassword(password);
    setEmail(email);
    setNewSelect(accesslvl);
    setIsEditModalOpen(true);

  }


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
          <Button type = "primary" danger onClick={() => deleteData(record.id)}>Delete</Button>
          <Button type="primary" onClick={() => setData(record)}>Edit</Button>
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
              { type: "email", message: "Email you entered is not correct!" }
            ]}
          >
            <Input placeholder="email" id="email" />
          </Form.Item>
          <Form.Item
            className="password"
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
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

      <Modal title="Edit User Details" visible={isEditModalOpen} onOk={handleOkEdit} onCancel={handleCancel}>
        <Form
          name="basic"
          initialValues={{ remember: false }}
          className="row-col"
          layout="vertical"
          fields={[
            {
              name: "firstname",
              value: firstname
            },
            {
              name: "lastname",
              value: lastname
            },
            {
              name: "username",
              value: username
            },
            {
              name: "email",
              value: email
            },
            {
              name: "password",
              value: password
            }
          ]}
        >
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input placeholder="Enter Firstname" id="firstname" onChange={(e) => setFirstname(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your lastname!" },
            ]}
          >
            <Input placeholder="Enter Lastname" id="lastname" onChange={(e) => setLastname(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input placeholder="Enter Usernanme" id="username" onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            className="email"
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Email you entered is not correct!" }
            ]}
          >
            <Input placeholder="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            className="password"
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input placeholder="Enter Password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Access Level"
            name="accesslvl"
          >
            <Select
              labelInValue
              defaultValue={{
                value: newselect,
                label: newselect
              }}
              onChange={handleChangeEdit}
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
