import React, { useEffect, useState } from 'react';

function Message(props) {
    const [visible, setVisible] = useState(props.visible)
    // if (props.visible) {
    //     setTimeout(() => {
    //         setVisible(false)
    //     }, props.dealay);
    // }
    // useEffect(() => {
    //     console.log('props :>> ', props);
    // }, [props])

    return (
        visible && <div style={{ zIndex: 100000 }}>
            <button onClick={() => setVisible(false)}>close</button>
            {props.message}
        </div>
    );
}


const message = (content, dealay) => {

    <Message
        message={content}
        dealay={dealay}
        visible={true}

    />
}
export { message, Message }
