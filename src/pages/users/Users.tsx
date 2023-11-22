import { useAppContext } from "contexts/AppContext";
import { useEffect, useState } from "react";
import PrimaryButton from "components/PrimaryButton";
import useModal from "components/modal/useModal";
import { ModalContext } from "components/modal/ModalContext";
import classNames from "classnames";
import useFetch from "lib/useFetch";
import Row from "./Row";
import NotFound from "pages/NotFound";
import UserForm, { roles } from "./UserForm";


export interface IHeader {
    key: string
    name: string
    type?: string
}

const TableHead = ({ text }) => {
    return (
        <th
            scope="col"
            className={
                classNames(
                    "py-3.5 pl-4 pr-4 text-center text-sm font-semibold sm:pl-3",
                    //thWhite ? "" : "text-white"
                )
            }
            align="center"
        >
            <div className="text-center">
                {text}
            </div>
        </th>
    )
}


const Users = () => {

    const {
        currentUser = { role: "" },
    } = useAppContext();


    let canAdd = true,
        showHeader = true,
        canEdit = true,
        canDelete = true;

    const [rows, setRows] = useState<any[]>([]);

    const addModalHook = useModal();

    const {
        onFetch
    } = useFetch("/api/users", setRows);

    useEffect(() => {
        onFetch()
    }, [])    

    if (!currentUser || !currentUser.role.includes("Admin")) {
         return <NotFound />

    }

    return (
        <div className="pt-20 h-screen">
            <div className="md:w-1/2 mx-auto my-20">
                <ModalContext.Provider
                    value={addModalHook}
                >

                    <div className="w-full">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                            </div>
                            {
                                canAdd ?
                                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                        <PrimaryButton
                                            onClick={addModalHook.onToggle}
                                        >
                                            Add User
                                        </PrimaryButton>
                                    </div>
                                    : null
                            }
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 ">
                                    <table className={classNames(
                                        "min-w-full divide-y divide-gray-300 border",
                                        //thWhite ? "" : "bg-green-850"
                                    )}>
                                        <thead>
                                            {
                                                showHeader ?
                                                    <tr>
                                                        <TableHead
                                                            text={"Name"}
                                                        />
                                                        <TableHead
                                                            text={"Email"}
                                                        />
                                                        <TableHead
                                                            text={"Role"}
                                                        />
                                                        {
                                                            canEdit || canDelete ?
                                                                <TableHead
                                                                    text={""}
                                                                />
                                                                : null
                                                        }
                                                    </tr>
                                                    : null
                                            }
                                        </thead>
                                        <tbody className="bg-white">
                                            {
                                                rows.map((row, j) => <Row
                                                    j={j}
                                                    rows={rows}
                                                    setRows={setRows}
                                                    row={row}
                                                />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserForm
                        title="Add User"
                        initialValues={{
                            name: "",
                            email: "",
                            role: roles[0]
                        }}
                        path="/api/users"
                        onClose={addModalHook.onClose}
                        rows={rows}
                        setRows={setRows}
                    />
                </ModalContext.Provider>

            </div>
        </div>
    );
}

export default Users;