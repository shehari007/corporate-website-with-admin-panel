import { Button,Card, Space, Table, notification , Typography} from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useReducer } from 'react';



  const deleteAlert = () =>{
    notification.open({
      message: 'Products',
      description:
        'Product Deleted Successfully',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

function Allproducts() {

    const [products, setProducts] = useState([]);
    const [cat, setCat] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "CategoriesSelect" });
            console.log(res.data);
            setCat(res.data);
        };
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.post(`http://localhost:5000/index`, { action: "Products" });
            console.log(res.data);
            setProducts(res.data);
        };
        getData();
    }, [ignored]);

    const deleteData = async (id) => {
        var axios = require('axios');

        var data = JSON.stringify({
            "action": "DeleteProducts",
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
            .then(async function  (response) {
                console.log(response);
                deleteAlert();
                forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const columns = [
      
        {
            title: 'Product Name',
            dataIndex: 'prod_name',

        },
        {
            title: 'Description',
            dataIndex: 'prod_desc',
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'prod_cat',
            filters: cat.map((data) => {
                return {
                    text: data.name,
                    value: data.name,
                }
            }),
            onFilter: (value, record) => record.prod_cat.startsWith(value),

        },
        {
            title: 'Image SRC',
            dataIndex: 'prod_img',
        },
        {
            title: 'BG SRC',
            dataIndex: 'prod_bg',
        },
        {
            title: 'Featured',
            dataIndex: 'prod_feat',
            filters: [
                {
                    text: 'Yes',
                    value: 'Yes',
                },
                {
                    text: 'No',
                    value: 'No',
                },
            ],
            onFilter: (value, record) => record.prod_feat.startsWith(value),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' danger onClick={()=> deleteData(record.id)}>Delete</Button>
                    <Button type='primary' onClick={()=> deleteData(record.id)}>Edit</Button>
                </Space>

            ),
        }

    ];
    const data = products

    return (
            <>
            
                <Card
                    bordered={true}
                    className="criclebox tablespace mb-24"
                    title={"Total Products:  "+ products.length}
                    extra={
                        <Space size="middle"><a href='/addproducts'><Button type='primary'>Add New Product</Button></a></Space>}
                >
                    <Table columns={columns} dataSource={data} style={{ margin: "1%" }} bordered /></Card>
                   
            </>
    );
}

export default Allproducts;
