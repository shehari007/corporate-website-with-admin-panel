
import { useState, useEffect } from "react";
import { useReducer } from 'react';
import axios from "axios";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Modal, Form, Input, notification
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import secureLocalStorage from "react-secure-storage";
import TextArea from "antd/lib/input/TextArea";

const profileupdatedAlert = () =>{
  notification.open({
    message: 'Profile Info',
    description:
      'Profile Info Updated Successfully',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const profileupdatedErrorAlert = () =>{
  notification.open({
    message: 'Profile Info',
    description:
      'System Error please try later..',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

function Profile() {

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [number, setNumber] = useState('');
  const [loc, setLocation] = useState('');
  const [fb, setFBLink] = useState('');
  const [inst, setINSTLink] = useState('');
  const [twit, setTWITLink] = useState('');

  const setDATA = () => {
    details.map((data) => {
      return <>
        {setTitle(data.title)}
        {setBio(data.bio)}
        {setFirstname(data.firstname)}
        {setLastname(data.lastname)}
        {setNumber(data.number)}
        {setLocation(data.location)}
        {setFBLink(data.social_fb)}
        {setINSTLink(data.social_inst)}
        {setTWITLink(data.social_twit)}
      </>
    })
    setIsEditModalOpen(true);
  }
  const handleCancel = () => {

    setIsEditModalOpen(false);

  };

  const handleOkEdit = () => {
    var name = secureLocalStorage.getItem('username');
    var axios = require('axios');

    var data = JSON.stringify({
      "action": "editProfileInfo",
      "parameters": {
        "username": name,
        "firstname": firstname,
        "lastname": lastname,
        "title": title,
        "bio": bio,
        "location": loc,
        "number": number,
        "fb": fb,
        "inst": inst,
        "twit": twit
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
          profileupdatedAlert();
          setIsEditModalOpen(false);
          forceUpdate();
          //window.location.replace('/sign-in');
        } else {
          profileupdatedErrorAlert();
          setIsEditModalOpen(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  useEffect(() => {
    var name = secureLocalStorage.getItem('username');
    const getData = async () => {
      const res = await axios.post(`http://localhost:5000/index`, {
        action: "userDetails",
        parameters: {
          username: name
        }
      });
      console.log(res.data);
      setDetails(res.data);
      //console.log(details.bio);
    };
    getData();
  }, [ignored]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Anne Marie",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Ivan",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Peterson",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Nick Daniel",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{secureLocalStorage.getItem('username')}</h4>
                  <p>{details.map((data) => { return <>{data.title === '' ? "No title found" : data.title}</> })}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link" onClick={()=>setDATA()}>{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              {" "}
              {details.map((data) => { return <>{data.bio === "" ? "Write about yourself?" : data.bio}</> })}
              {" "}
            </p>
            <hr className="my-25" />
            <Descriptions title="General Details">
              <Descriptions.Item label="Full Name" span={3}>
                {details.map((data) => { return <>{data.firstname + " " + data.lastname}</> })}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {details.map((data) => { return <>{data.number === "" ? "--------------" : data.number}</> })}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {details.map((data) => { return <>{data.email}</> })}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {details.map((data) => { return <>{data.location === "" ? "--------------" : data.location}</> })}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                {details.map((data) => {
                  return <>{data.social_twit === "" ? null :
                    <a href={data.social_twit} className="mx-5 px-5">
                      {<TwitterOutlined />}
                    </a>}</>
                })}
                {details.map((data) => {
                  return <>{data.social_fb === "" ? null :
                    <a href={data.social_fb} className="mx-5 px-5">
                      {<FacebookOutlined style={{ color: "#344e86" }} />}
                    </a>}</>
                })}
                {details.map((data) => {
                  return <>{data.social_inst === "" ? null :
                    <a href={data.social_inst} className="mx-5 px-5">
                      {<InstagramOutlined style={{ color: "#e1306c" }} />}
                    </a>}</>
                })}
              </Descriptions.Item>

            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>

      <Modal title="Profile Information" visible={isEditModalOpen} onOk={handleOkEdit} onCancel={handleCancel} okText="Update"width={1000} centered>
        <Form
          name="basic"
          initialValues={{ remember: false }}
          className="row-col"
          layout="vertical"
          fields={[
            {
              name: "title",
              value: title
            },
            {
              name: "bio",
              value: bio
            },
            {
              name: "firstname",
              value: firstname
            },
            {
              name: "lastname",
              value: lastname
            },
            {
              name: "number",
              value: number
            },
            {
              name: "location",
              value: loc
            },
            {
              name: "fb",
              value: fb
            },
            {
              name: "inst",
              value: inst
            },
            {
              name: "twit",
              value: twit
            }
          ]}
        >
          <Form.Item
            name="title"
            label="Occupation Title"
          >
            <Input placeholder="Enter occupation title" id="title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Your bio"
          >
            <TextArea placeholder="Write your bio" id="bio" onChange={(e) => setBio(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="firstname"
            label="FirstName"
          >
            <Input placeholder="Enter Firstname" id="firstname" onChange={(e) => setFirstname(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Lastname"
          >
            <Input placeholder="Enter Lastname" id="lastname" onChange={(e) => setLastname(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
          >
            <Input placeholder="Enter Number" id="number" onChange={(e) => setNumber(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
          >
            <Input placeholder="Enter Location" id="location" onChange={(e) => setLocation(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="FB Profile Link"
            name="fb"
          >
            <Input placeholder="Enter facebook profile link" id="fblink" onChange={(e) => setFBLink(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Insta Profile Link"
            name="inst"
          >
            <Input placeholder="Enter insta profile link" id="instlink" onChange={(e) => setINSTLink(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Twitter Profile Link"
            name="twit"
          >
            <Input placeholder="Enter twitter profile link" id="twitlink" onChange={(e) => setTWITLink(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>


    </>
  );
}

export default Profile;
