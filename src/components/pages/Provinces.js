import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { geomanagementApi } from '../../service/api';
import translator from '../../Translator/translator';
import { EditOutlined } from '@ant-design/icons';
import PrvnTable from '../PrvnTable';
import SearchForm from './SearchForm';

function Province(props) {
    const [dataSource, setDataSource] = useState([])
    const [name, setName] = useState(undefined)

    const columns = [{
        title: 'nameLocal',
        dataIndex: 'localName',
        key: '1',
    },
    {
        title: 'otherName',
        dataIndex: 'otherName',
        key: '2',
    },
    {
        title: 'enName',
        dataIndex: 'enName',
        key: '3',
    },
    {
        title: 'createTime',
        dataIndex: 'createTime',
        key: '4',
    },
    {
        title: translator('Action'),
        key: 'action',
        render: (text, record) => (
            <Link
                to={{
                    pathname: `/provinces/${record.id}/edit`,
                    state: { id: record.id }
                }}
            >
                <EditOutlined />
            </Link>
        ),
    },
    {
        title: 'deleted',
        dataIndex: 'deleted',
        key: 'deleted',
        render: (text, record) => {
            return <>
                <Modal id={record.id} record={record} type={"provinces"} />

            </>
        }
    },
    ]

    const mySubmitHandler = (event) => {
        event.preventDefault()
        getData()
    }

    const reset = (event) => {
        event.preventDefault();
        setName("")
        setDataSource([])
    }

    const getData = () => {
        const params = { name: name }
        geomanagementApi.get("/provinces", { params: params }).then((res) => {
            setDataSource(res.data.data)
        })
    }

    return (
        <div>
            <h2>{translator("provinces")}
                <Link to="/provinces/new" >
                    <button> {translator("create new province")} </button></Link></h2>
            <SearchForm
                onChange={(e) => {
                    setName(e.target.value)
                }} value={name}
                mySubmitHandler={mySubmitHandler}
                reset={reset}  />

            <PrvnTable
                dataSource={dataSource}
                columns={columns}
                pagination={false} >
            </PrvnTable>
        </div>
    );
}
export default Province;