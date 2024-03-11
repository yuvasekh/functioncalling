import React, { useEffect, useState,createContext  } from 'react';
import { Select, Checkbox } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.scss';
import Home from '../Home/Home';
import { getallFunctionNames } from '../Services/api';
const { Option } = Select;
const UserContext = createContext()
// import { useGlobalState } from './GlobalStateContext';
// import  {allitems} from '../valuesContext/ValuesStore'
const CheckboxDropdown = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  // const items = [
    
  //   {
  //     key: "time",
  //     label: "time"
  //   },
  // ];
  useEffect(()=>
  {
  async function fetchData()
  {
    var totalFunctionNames=await getallFunctionNames()
    let dummy=[]
    console.log(totalFunctionNames,"totalFunctionNames")
    if(totalFunctionNames.length>0)
    {
      totalFunctionNames.map((item,index)=>
      {
        dummy.push({
          key: item.name,
          label: item.name,
        },)

      })
      setItems(dummy)
    }
  }
  fetchData()
  },[])
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
          dropdownStyle={{ backgroundColor: 'grey' }}
        >
          {/* <h1 style={{color:'white'}}>selected count {selectedItems.length}/{items.length}</h1> */}
          {items.map(item => (
            <Option key={item.key} value={item.key}>
              <Checkbox onChange={(e) => handleCheckboxChange(item.key, e.target.checked)} />
              <span style={{color:'white',marginLeft:'7px'}}>{item.label}</span>
            </Option>
          ))}
        </Select>
      </div>
      <UserContext.Provider value={items}>

      { children }
    </UserContext.Provider>

    </div>
  );
};

export default CheckboxDropdown;
export const useGlobalState = () => useContext(GlobalStateContext);
