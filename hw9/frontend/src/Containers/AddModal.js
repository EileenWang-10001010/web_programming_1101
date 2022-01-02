
import {Modal, Input} from 'antd'

export default function AddModal(props) {
    const {visible, onCreate, onCancel, inputRef} = props
    return (
        <Modal
            title="Enter the person :"
            visible={visible}
            onOk={onCreate}
            onCancel={onCancel}
            okText="Create"
        >
            <Input placeholder="name" ref={inputRef}/>
            
        </Modal>
    )
}