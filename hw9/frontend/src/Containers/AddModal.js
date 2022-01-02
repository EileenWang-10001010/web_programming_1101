
import {Modal, Input} from 'antd'

export default function AddModal(props) {
    const {visible, onCreate, onCancel, inputRef} = props
    return (
        <Modal
            title="Enter the person who already has an account (signed in):"
            visible={visible}
            onOk={onCreate}
            onCancel={onCancel}
            okText="Create"
        >
            <Input placeholder="that person need to have a account (sign in) first, otherwise error" ref={inputRef}/>
            
        </Modal>
    )
}