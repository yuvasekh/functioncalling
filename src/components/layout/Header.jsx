import React, { useEffect, useState } from 'react';
import { Select, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './Header.scss';
import { getallFunctionNames } from '../Services/api';
import { connect, useDispatch } from 'react-redux';
import { loginuser, showwidgetbox } from '../ReduxStore/actions';

const { Option } = Select;

const CheckboxDropdown = ({ showwidget }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var totalFunctionNames = [
        {
          name: "time",
          label: "time"
        },
      ];
      let dummy = [];
      if (totalFunctionNames.length > 0) {
        totalFunctionNames.forEach(item => {
          dummy.push({
            key: item.name,
            label: item.name,
          });
        });
        setItems(dummy);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (itemKey, checked) => {
    let updatedSelectedItems;
    if (checked) {
      updatedSelectedItems = [...selectedItems, itemKey];
    } else {
      updatedSelectedItems = selectedItems.filter(key => key !== itemKey);
    }
    setSelectedItems(updatedSelectedItems);
  };

  const show = () => {
    console.log("test");
    console.log(showwidget)
    dispatch(showwidgetbox(!showwidget)); // Dispatch action to show widget box
  };

  return (
    <div className='head'>
      <EditOutlined onClick={show} />
      <div>
        <h4>Function Calling</h4>
      </div>
      <div>
        <Select
          placeholder="Select Functions"
          value={[]}
 
          mode="multiple"
          showSearch={false}
          dropdownStyle={{ backgroundColor: 'grey' }}
        >
          {items.map(item => (
            <Option key={item.key} value={item.key}>
              <Checkbox onChange={(e) => handleCheckboxChange(item.key, e.target.checked)} />
              <span style={{ color: 'white', marginLeft: '7px' }}>{item.label}</span>
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  count: state.count,
  isAuthenticated: state.isAuthenticated,
  showwidget:state.showwidget
});

const mapDispatchToProps = {
  loginuser,
  showwidgetbox
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxDropdown);
