import { ModalContext } from "components/modal/ModalContext";
import useModal from "components/modal/useModal"
import ConfirmModal from "components/modal/ConfirmModal";
import useFetch from "lib/useFetch";
import UserForm from "./UserForm";

const Row = ({ row, j, rows, setRows, }) => {

    let canEdit = true,
        canDelete = true;

    let editModalHook = useModal()

    let deleteModalHook = useModal()

    let path = `/api/users/${row.id}`;

    const {
        onDelete,
    } = useFetch(path, () => {
        onRemoveItemById(j);
    });

    const onRemoveItemById = (i: number) => {
        rows.splice(i, 1);
        setRows([...rows]);
    }

    const handleDelete = () => onDelete();

    const onConfirmDelete = () => {
        deleteModalHook.onOpen();
    }

    return (
        <tr>
            <td className={"whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"}>
                {row.name}
            </td>
            <td className={"whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"}>
                {row.email}
            </td>
            <td className={"whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"}>
                {row.role}
            </td>
            <td className="relative whitespace-nowrap py-4 pr-4 text-sm font-medium sm:pr-6">
                {
                    canEdit ?
                        <ModalContext.Provider
                            value={editModalHook}
                        >
                            <button onClick={editModalHook.onOpen} className="">
                                <i className="fa fa-pencil"></i>
                            </button>
                            <UserForm
                                i={j}
                                title="Edit User"
                                initialValues={row}
                                path={path}
                                onClose={editModalHook.onClose}
                                rows={rows}
                                setRows={setRows}
                                isEditing
                            />
                        </ModalContext.Provider>
                        : null
                }
                {
                    canDelete ?
                        <ModalContext.Provider
                            value={deleteModalHook}
                        >
                            <button onClick={onConfirmDelete} className="ms-3">
                                <i className="fa fa-trash"></i>

                            </button>
                            <ConfirmModal
                                onConfirm={handleDelete}
                                title={`Delete User`}
                                text="Are you sure you want to delete this? All of your data will be permanently removed from our servers forever. This action cannot be undone."
                            />
                        </ModalContext.Provider>
                        : null
                }
            </td>
        </tr >
    )
}

export default Row;