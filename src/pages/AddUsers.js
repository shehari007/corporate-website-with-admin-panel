import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import parse from 'html-react-parser'



const AddUsers = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
        const res = await axios.post(`http://localhost:5000/index`, { action: "Example" });
        console.log(res.data);
        setCategories(res.data);
    };
    getData();
  }, []);

  return (
    <div>
      {categories.map((data) =>{
        return <>
            <div>Title = {data.prod_name}</div>
            <div>Desc = {parse(data.prod_desc)}</div>
        </>
      })}
    </div>
  )
}

export default AddUsers
