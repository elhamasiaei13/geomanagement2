import React from 'react';
import { Table } from 'antd';

function PrvnTable(props) {
    console.log('props table :>> ', props);

    return (
        <>
            <Table
                {...props}
                dataSource={props.dataSource}
                columns={props.columns} />
        </>
    );
}

export default PrvnTable;