import React, { useEffect, useState } from 'react';
import { Select, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.scss';
const { Option } = Select;

const CheckboxDropdown = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const items = [
    {
      key: "1",
      label: "weather"
    },
    {
      key: "2",
      label: "time"
    },
  ];
  useEffect(()=>
  {
console.log(selectedItems,"usefefect")
  },[selectedItems.length])
  const handleChange = (value) => {
    // console.log(value,"check")
    // setSelectedItems(value);
  };
  const handleCheckboxChange = (itemKey, checked) => {
    let updatedSelectedItems;
    if (checked) {
        // console.log("iff","itemKey")
      updatedSelectedItems = [...selectedItems, itemKey];
    } else {
        // console.log("else")
      updatedSelectedItems = selectedItems.filter(key => key !== itemKey);
    }
    console.log(selectedItems,"selece")
    setSelectedItems(updatedSelectedItems);
  };
 

  return (
    <div className='head'>
      <div>
        <h4>Function Calling</h4>
      </div>
      <div>
      <Select
          placeholder="Select Functions"
          value={[]}
          onChange={handleChange}
          mode="multiple"
          showSearch={false}
        >
          <h1 style={{color:'white'}}>selected count {selectedItems.length}/{items.length}</h1>
          {items.map(item => (
            <Option key={item.key} value={item.key}>
              <Checkbox onChange={(e) => handleCheckboxChange(item.key, e.target.checked)} />
              <span style={{color:'white',marginLeft:'7px'}}>{item.label}</span>
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default CheckboxDropdown;
