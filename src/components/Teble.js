import React from 'react';


function Teble(props) {

    const createHeader = () => {
        let arrayHeader = []
        props.columns.forEach(it => {
            arrayHeader.push(
                <th key={it.key}>
                    {it.title}
                </th>
            )
        })
        return arrayHeader
    }

    const createBody = (headerItem = []) => {
        let sortData = []
        let obj = {}
        let headerIndex = []
        let body = []

        ///dynamic change Header
        props.columns.forEach(it => {
            headerIndex.push(it.dataIndex)
        })

        props.dataSource.forEach(it => {
            obj = {}
            props.columns.forEach(h => {
                const obj_name = {};
                obj_name[h.dataIndex] = it[h.dataIndex];
                obj = Object.assign({}, obj, obj_name)
            })
            sortData.push(obj)
        })


        sortData.map(objectRow => {
            body.push(<tr> {createTd(objectRow)} </tr>)
        })


        return body
    }
    const createTd = (objectRow) => {
        let halfbody = []

        for (const [key, value] of Object.entries(objectRow)) {
            halfbody.push(<td> {value}</td>)
        }
        return halfbody
    }

    return (
        <>
            <table>
                <thead >
                    <tr>
                        {createHeader()}
                    </tr>
                </thead>
                <tbody>
                    {createBody()}
                </tbody>
            </table>

        </>
    );

}

export default Teble;

// Teble.defaultProps = {

//     columns: [{
//         title: 'localName',
//         dataIndex: 'localName',
//         key: 'localName',
//     }],
//     data: []
// }
