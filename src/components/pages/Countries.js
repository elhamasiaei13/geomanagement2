import React, { useEffect, useState } from 'react';
// import Table from '../Teble';

import PrvnTable from '../PrvnTable';
import Table from '../Teble';
import { EditOutlined, DeleteTwoTone, CheckCircleOutlined, CloseCircleOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import translator from '../../Translator/translator';
import Modal from '../Modal';
import { geomanagementApi } from '../../service/api';
import { PrvnInput, PrvnTag } from '../PrvnComponents';
import { Pagination } from 'antd';
import SearchForm from './SearchForm';
import { toast } from 'react-toastify';

function Countries(props) {
    const [dataSource, setDataSource] = useState([])
    const [name, setName] = useState("")
    const [visibleMessage, setVisibleMessage] = useState(false)
    const [contentMessage, setContentMessage] = useState(undefined)


    const columns = [
        {
            title: translator('code'),
            dataIndex: 'code',
            key: '10'
        },
        {
            title: translator('otherNames'),
            dataIndex: 'otherNames',
            key: '2',
        },
        {
            title: translator('nameEn'),
            dataIndex: 'nameEn',
            key: '3',
        },
        {
            title: translator('nameFa'),
            dataIndex: 'nameFa',
            key: '6',
        },
        {
            title: translator('nameLocal'),
            dataIndex: 'nameLocal',
            key: '1',
        },
        {
            title: translator('createdOn'),
            dataIndex: 'createdOn',
            key: '4',
        }, {
            title: translator('updatedOn'),
            dataIndex: 'updatedOn',
            key: '5',
        },
        // {
        //     title: translator('Action'),
        //     key: 'action',
        //     render: (text, record) => (
        //         <>
        //             <Link
        //                 to={{
        //                     pathname: `/countries/${record.id}/edit`,
        //                     state: { id: record.id }
        //                 }}
        //             >
        //                 <EditOutlined />
        //             </Link>

        //             <Modal
        //                 btn={<DeleteTwoTone className="prvn-tag-hover" />}

        //                 handleOk={() => {
        //                     geomanagementApi.delete(`/countries/${record.id}`)
        //                         .then(() => {
        //                             toast.success(translator("successDone"));
        //                             getData();
        //                         })
        //                         .catch(() => {
        //                             toast.error(translator("errorDone"));
        //                         })
        //                 }}
        //             />

        //             {record.isActive ?
        //                 <Modal
        //                     btn={<CheckCircleFilled className={"icon-active"} />}

        //                     showMessage={"از غیر فعال کردن این رکورد اطمینان دارید"}
        //                     handleOk={() => {
        //                         geomanagementApi.put(`/countries/${record.id}/deactive`, { id: `${record.id}` })
        //                             .then(() => {
        //                                 toast.success(translator("successDone"));
        //                                 getData();
        //                             })
        //                             .catch(() => {
        //                                 toast.error(translator("errorDone"));
        //                             })
        //                     }}
        //                 />
        //                 :
        //                 <Modal
        //                     btn={<CloseCircleFilled className={"icon-disable"} />}

        //                     showMessage={"از فعال کردن این رکورد اطمینان دارید"}
        //                     handleOk={() => {
        //                         geomanagementApi.put(`/countries/${record.id}/active`, { id: `${record.id}` })
        //                             .then(() => {
        //                                 toast.success(translator("successDone"));
        //                                 getData();
        //                             })
        //                             .catch(() => {
        //                                 toast.error(translator("errorDone"));
        //                             })
        //                     }}
        //                 />
        //             }

        //             {record.isApproved ?
        //                 <Modal
        //                     btn={<PrvnTag color="green"> {translator("active")}</PrvnTag >}

        //                     showMessage={"از فعال کردن این رکورد اطمینان دارید"}
        //                     handleOk={() => {
        //                         geomanagementApi.put(`/countries/${record.id}/toggleapprove`, { id: `${record.id}` })
        //                             .then(() => {
        //                                 toast.success(translator("successDone"));
        //                                 getData();
        //                             })
        //                             .catch(() => {
        //                                 toast.error(translator("errorDone"));
        //                             })
        //                     }}
        //                 />
        //                 :
        //                 <Modal
        //                     btn={<PrvnTag color="red"> {translator("disable")}</PrvnTag >}

        //                     showMessage={"از فعال کردن این رکورد اطمینان دارید"}
        //                     handleOk={() => {
        //                         geomanagementApi.put(`/countries/${record.id}/toggleapprove`, { id: `${record.id}` })
        //                             .then(() => {
        //                                 toast.success(translator("successDone"));
        //                                 getData();
        //                             })
        //                             .catch(() => {
        //                                 toast.error(translator("errorDone"));
        //                             })
        //                     }}
        //                 />
        //             }
        //         </>
        //     ),
        // },

        {
            title: translator('Action'),
            key: 'action',
            render: (text, record) => (
                <>
                    <Link
                        to={{
                            pathname: `/countries/${record.id}/edit`,
                            state: { id: record.id }
                        }}
                    >
                        <EditOutlined />
                    </Link>

                    <Modal
                        btn={<DeleteTwoTone className="prvn-tag-hover" />}

                        handleOk={() => {
                            geomanagementApi.delete(`/countries/${record.id}`)
                                .then(() => {
                                    toast.success(translator("successDone"));
                                    getData();
                                })
                                .catch(() => {
                                    toast.error(translator("errorDone"));
                                })
                        }}
                    />


                    <Modal
                        btn={<CheckCircleFilled className={record.isActive ? "icon-active" : "icon-disabled"} />}
                        disabled={record.isActive ? false : true}

                        showMessage={"از غیر فعال کردن این رکورد اطمینان دارید"}
                        handleOk={() => {
                            geomanagementApi.put(`/countries/${record.id}/deactive`, { id: `${record.id}` })
                                .then(() => {
                                    toast.success(translator("successDone"));
                                    getData();
                                })
                                .catch(() => {
                                    toast.error(translator("errorDone"));
                                })
                        }}
                    />

                    <Modal
                        btn={<CloseCircleFilled className={record.isActive ? "icon-disabled" : "icon-deactive"} />}
                        disabled={record.isActive ? true : false}
                        showMessage={"از فعال کردن این رکورد اطمینان دارید"}
                        handleOk={() => {
                            geomanagementApi.put(`/countries/${record.id}/active`, { id: `${record.id}` })
                                .then(() => {
                                    toast.success(translator("successDone"));
                                    getData();
                                })
                                .catch(() => {
                                    toast.error(translator("errorDone"));
                                })
                        }}
                    />


                    
                        <Modal
                            btn={<PrvnTag  className={record.isApproved ? "icn-green" : "icon-deactive"}> {translator("active")}</PrvnTag >}
                            disabled={record.isApproved ? false : true}
                            showMessage={"از فعال کردن این رکورد اطمینان دارید"}
                            handleOk={() => {
                                geomanagementApi.put(`/countries/${record.id}/toggleapprove`, { id: `${record.id}` })
                                    .then(() => {
                                        toast.success(translator("successDone"));
                                        getData();
                                    })
                                    .catch(() => {
                                        toast.error(translator("errorDone"));
                                    })
                            }}
                        />
                        
                        <Modal
                            btn={<PrvnTag  className={record.isApproved ? "icon-deactive" : "icon-red"}> {translator("disable")}</PrvnTag >}
                            disabled={record.isApproved ? true : false}

                            showMessage={"از فعال کردن این رکورد اطمینان دارید"}
                            handleOk={() => {
                                geomanagementApi.put(`/countries/${record.id}/toggleapprove`, { id: `${record.id}` })
                                    .then(() => {
                                        toast.success(translator("successDone"));
                                        getData();
                                    })
                                    .catch(() => {
                                        toast.error(translator("errorDone"));
                                    })
                            }}
                        />
                    
                </>
            ),
        },


    ]

    const getData = async () => {
        const params = { name: name }
        try {
            const res = await geomanagementApi.get("/countries", { params: params })
            setDataSource(res.data.data)
        } catch (error) {
            setDataSource([])
            console.log('getData :>> ', error);
        }
    }

    const mySubmitHandler = (event) => {
        event.preventDefault()
        console.log('name :>> ', name);
        getData()

    }

    const reset = (event) => {
        event.preventDefault();
        setName("")
        setDataSource([])
    }


    return (
        <div>
            <h2>{translator("countries")}
                <Link to="/countries/new"><button className={"btn"}>{translator("create new countries")}</button></Link></h2>
            <SearchForm
                onChange={(e) => {
                    setName(e.target.value)
                }} value={name}
                mySubmitHandler={mySubmitHandler}
                reset={reset}
            />
            <div >
                <PrvnTable
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    size="small"
                    total={50}
                    showTotal={(total) => `Total ${total} items`}
                    showSizeChanger
                />
            </div>
        </div>
    );
}

export default Countries;