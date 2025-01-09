import Header from "../user/header";
import React, { useState, useEffect } from 'react';
import { Table, Button, Checkbox, Space, message, Spin } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined,LoadingOutlined  } from '@ant-design/icons';
import "../css/table.css";

const DeleteVoter = () => {
    const [records, setRecords] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const customLoader = <LoadingOutlined style={{ fontSize: 24, color: 'orange' }} spin />;

    const user = JSON.parse(localStorage.getItem("user"));
    const listVoterURL = "http://localhost:8080/voter/listAllVoters";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: "Bearer " + user.accessToken
      }
  
    // Fetch records from the backend
    useEffect(() => {
      const fetchRecords = async () => {
        setLoading(true);
        try {
          const response = await axios.get(listVoterURL,{headers:headers});
          setRecords(response.data);
        } catch (error) {
          message.error('Failed to fetch records.');
        } finally {
          setLoading(false);
        }
      };
      fetchRecords();
    }, []);
  
    // Handle delete action
    const handleDelete = (id) => {
      // Perform delete operation here
      message.success(`Record with ID ${id} deleted.`);
    };
  
    // Handle edit action
    const handleEdit = (id) => {
      // Perform edit operation here
      message.info(`Editing record with ID ${id}.`);
    };
  
    // Row selection
    const rowSelection = {
      selectedRowKeys, // Tracks which rows are selected
      onChange: (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
      },
      
    // Enables "Select All" functionality
    onSelectAll: (selected, selectedRows, changeRows) => {
        const ids = selected ? selectedRows.map((row) => row.id) : [];
        setSelectedRowKeys(ids);
      },
      // Handles selecting/deselecting a single row
      onSelect: (record, selected) => {
        const newSelectedRowKeys = selected
          ? [...selectedRowKeys, record.id]
          : selectedRowKeys.filter((key) => key !== record.id);
        setSelectedRowKeys(newSelectedRowKeys);
      },


    };
  
    // Define columns
    const columns = [
      {
        title: 'Voter ID',
        dataIndex: 'voterId',
        key: 'voterId',
      },
      {
        title: 'Epic Number',
        dataIndex: 'epicNumber',
        key: 'epicNumber',
      },
      {
        title: 'First Name',
        dataIndex : 'firstName',
        key: 'firstName',
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',

      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.voterId)}
            />
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.voterId)}
            />
          </Space>
        ),
      },
    ];
  
  // Function to style rows based on index
  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };

    return (
        <div className="container">
            <Header></Header>
            <Spin spinning={loading} indicator={customLoader}>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={records}
                loading={loading}
                rowKey={(record) => record.voterId}
                rowClassName={getRowClassName}
            />
            </Spin>
        </div>
    );
  };

export default DeleteVoter;