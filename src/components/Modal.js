import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import translator from '../Translator/translator';
import { PrvnCol, PrvnTag } from './PrvnComponents';
import { DeleteTwoTone } from '@ant-design/icons';
import { geomanagementApi } from '../service/api';
import { toast } from 'react-toastify';


function DeleteModal(props) {
    console.log('deleteModal :>> ', props);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [isModalVisible, setIsModalVisible] = useState(false);search param
    useEffect(() => { }, [isModalVisible])
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (e) => {
        const { id } = props.id
        setIsModalVisible(false);
        geomanagementApi.delete(`/${props.type}/${props.id}`)
            .then(() => {
                toast.success(translator("successDone"));
                props.getData();
            })
            .catch(() => {
                toast.error(translator("errorDone"));
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <>
            {
                props.disabled ?
                    <span style={{ color: "gray" }}>
                        {props.btn}
                    </span>
                    : <div classname="modal">
                        <span onClick={showModal} >
                            {props.btn}
                        </span>

                        {isModalVisible &&
                            <div className="modal">
                                <p > {props.showMessage}</p>
                                <button onClick={() => {
                                    props.handleOk()
                                    setIsModalVisible(false);
                                }} >ok</button>
                                <button onClick={handleCancel}>cancel</button>
                            </div>}
                    </div>

            }

        </>

    )
}

export default DeleteModal;
// props.type = delete| active|deactive \toggleapprove