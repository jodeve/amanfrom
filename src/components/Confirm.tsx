import OutlinedButton from "./OutlinedButton";
import Modal from "./modal/Modal";
import { ModalContext } from "./modal/ModalContext";

const Confirm = ({
    deleteModal,
    onDelete,
    isFetching,
}) => {
    return (
        <ModalContext.Provider
            value={deleteModal}
        >
            <Modal
                title="Confirm Delete"
            >
                <div className="flex justify-end">
                    <OutlinedButton
                        onClick={onDelete}
                        isLoading={isFetching}
                    >
                        Delete
                    </OutlinedButton>
                </div>
            </Modal>
        </ModalContext.Provider>
    )
}

export default Confirm;