import Title3 from "../Title3";
import AltTextInput from "../AltTextInput";
import { useAppContext } from "contexts/AppContext";

const Contacts = () => {

    const {
        DATA,
        signedIn,
        onChange,
    } = useAppContext();

    const contactKeys = Object.keys(DATA.contact);

    const contacts = Object.values(DATA.contact);

    const onChangeContact = ({ key, value }) => {
        const contact = DATA.contact[key];
        contact.text = value;
        onChange({ target: { value: DATA.contact, name: "contact", } })
    }

    return (
        <div>
            <Title3>Contact</Title3>
            <ul>
                {
                    contacts.map((contact: {
                        icon: string;
                        text: string;
                        protocol: string;
                    }, i) => {

                        const key = contactKeys[i];

                        return (
                            <li
                                key={i}
                                className="flex items-center gap-2"
                            >
                                <div style={{ width: "30px" }}>
                                    <i className={`fa fa-${contact.icon}`}></i>
                                </div>
                                {
                                    signedIn ?
                                        <AltTextInput
                                            className="p-0 m-0 px-2 bg-gray-500"
                                            value={contact.text}
                                            onChange={({ target }: any) => onChangeContact({ key, value: target.value })}
                                        />
                                        : <a
                                            href={contact.protocol ? `${contact.protocol}:${contact.text}` : '#'}
                                            className="text-right"
                                        >
                                            {contact.text}
                                        </a>
                                }
                            </li>
                        )

                    })
                }
            </ul>
        </div>
    )
}

export default Contacts;