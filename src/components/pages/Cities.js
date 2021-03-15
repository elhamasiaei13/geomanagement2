import React, { useEffect, useState } from 'react';
// import Table from '../Teble';

import PrvnTable from '../PrvnTable';
import Table from '../Teble';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import translator from '../../Translator/translator';
import Modal from '../Modal';
import { geomanagementApi } from '../../service/api';
import { PrvnInput, PrvnUseForm } from '../PrvnComponents';
import { toast } from 'react-toastify';
import SearchForm from './SearchForm';

function Cities(props) {
    const [dataSource, setDataSource] = useState([])
    const [name, setName] = useState(undefined)

    console.log('props.history :>> ', props.history);

    useEffect(() => {
        getData()
    }, [name])

    const getData = async () => {
        const params = { name: name }
        try {
            const res = await geomanagementApi.get("/cities", { params: params })
            setDataSource(res.data.data)
        } catch (error) {
            setDataSource([])
            console.log('getData :>> ', error);
        }
    }
    const reset = (event) => {
        event.preventDefault();
        setName("")
        setDataSource([])

    }


    const columns = [{
        title: translator('nameLocal'),
        dataIndex: 'localName',
        key: '1',
    },
    {
        title: translator('otherNames'),
        dataIndex: 'otherNames',
        key: '2',
    },
    {
        title: translator('nameEn'),
        dataIndex: 'nameEn', translator,
        key: '3',
    },
    {
        title: translator('createTime'),
        dataIndex: 'createTime',
        key: '4',
    },
    {
        title: translator('Action'),
        key: 'action',
        render: (text, record) => (
            <>
                <Link
                    to={{
                        pathname: `/cities/${record.id}/edit`,
                        state: { id: record.id }
                    }}
                >
                    <EditOutlined />
                </Link>
            </>
        ),
    },
    {
        title: 'deleted',
        dataIndex: 'deleted',
        key: 'deleted',
        render: (text, record) => {
            return <>
                <Modal id={record.id} record={record} type={"cities"} />
            </>
        }
    },
    ]
    const mySubmitHandler = (event) => {
        event.preventDefault()
        console.log('name :>> ', name);
        getData()
    }

    return (
        <div>
            <h2>{translator("cities")}
                <Link to="/cities/new"><button> {translator("create new cities")}</button></Link></h2>

            <SearchForm
                onChange={(e) => {
                    setName(e.target.value)
                }} value={name}
                mySubmitHandler={mySubmitHandler}
                reset={reset}
            />
            <PrvnTable
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            >
            </PrvnTable>
        </div>
    );
}

export default Cities;