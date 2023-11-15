import Title from "components/Title";
import Title2 from "components/Title2";
import AboutContent from "./AboutContent";
import { useAppContext } from "contexts/AppContext";
import { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import TextInput from "components/TextInput";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

const AboutHeader = () => {


    const {
        DATA,
        signedIn,
        onChange,
    } = useAppContext();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (contentState) => {
        setEditorState(contentState);
    }

    useEffect(() => {        
        const raw = DATA.FACILITIES_PERSONNEL_AND_SERVICES;
        // @ts-ignore
        const eS = convertFromRaw(raw);
        /*let state = ContentState.createFromBlockArray(
            eS.contentBlocks,
            eS.entityMap,
        );
        */
        setEditorState(EditorState.createWithContent(eS));
    }, [])

    useEffect(() => {
        //const html = stateToHTML(editorState.getCurrentContent());
        //if (html === "<p><br></p>") return;
        //onChange({ target: { name: "FACILITIES_PERSONNEL_AND_SERVICES", value: html } })
        const json = convertToRaw(editorState.getCurrentContent());
        onChange({ target: { name: "FACILITIES_PERSONNEL_AND_SERVICES", value: json } })
    }, [editorState])

    return (
        <>
            <div className="bg-blue-200 p-10 md:p-20">
                <Title>
                    Who We Are
                </Title>
                <p>
                    {
                        signedIn ?
                            <TextInput
                                name="about"
                                value={DATA["about"]}
                                onChange={onChange}
                            />
                            : DATA["about"]
                    }
                </p>
            </div>
            <div className="grid grid-cols-4">
                <div className="col-span-4 md:col-span-3">
                    <div className="p-5 md:px-20 pt-20">
                        <div className="grid md:grid-cols-1 gap-20">
                            <div className="">
                                <Title2>Facilities, Personnel and Services</Title2>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    readOnly={!signedIn}
                                    toolbarHidden={!signedIn}
                                    onEditorStateChange={onEditorStateChange}
                                    toolbar={{
                                        list: {
                                            className: "list-[upper-roman]"
                                        }
                                    }}
                                />

                            </div>
                            {/*<div className="mt-10">
                                <ul className="list-decimal">
                                    <Title2>DEPARTMENTS & UNITS</Title2>
                                    {
                                        DATA.departments_and_units.map((item, i) => {
                                            return (
                                                <li key={i} className=" mt-3 ">
                                                    {item.text}
                                                    {
                                                        item.sub ?
                                                            <ol className="ml-5 list-[upper-roman]">
                                                                {
                                                                    item.sub.map((sub, j) => (
                                                                        <li key={j}>{sub}</li>
                                                                    ))
                                                                }
                                                            </ol>
                                                            : null
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            <div className="grid md:grid-cols-4 gap-4">
                                {
                                    [
                                        "Health Care",
                                        "Health Care",
                                    ].map((_, i) => {
                                        return (
                                            <div key={i} >
                                                <Img src={`/imgs/${i + 1}.jpeg`} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>*/}
                        </div>
                        <AboutContent />
                    </div>
                </div>

            </div>
        </>
    )
}

export default AboutHeader;