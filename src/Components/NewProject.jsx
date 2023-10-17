import React, { useState, useEffect } from 'react';
import CodePane from './CodePane';
import SplitPane from 'react-split-pane';
import { FaHtml5, FaCss3, FaJs } from 'react-icons/fa';
import Logo from '../assets/codecraft.png'
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';
import UserProfileDetails from './User-Components/UserProfileDetails'
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Alert from './User-Components/Alert';


function NewProject() {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [jsCode, setJsCode] = useState('');
    const [iframeSrcDoc, setIframeSrcDoc] = useState('');
    const [title, setTitle] = useState("Title")
    const [isTitle, setIsTitle] = useState("")
    const user = useSelector((state) => state.user.user);
    const [savedAlert, setSavedAlert] = useState(false)



    useEffect(() => {
        const timeout = setTimeout(() => {
            setIframeSrcDoc(`
            <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>${htmlCode}</body>
            <script>${jsCode}</script>
            </html>
            `);
            localStorage.setItem('playground', JSON.stringify({ htmlCode, cssCode, jsCode }));
        }, 250);
        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode, jsCode]);

    useEffect(() => {
        const { htmlCode, cssCode, jsCode } = JSON.parse(localStorage.getItem('playground')) || { htmlCode: '', cssCode: '', jsCode: '' };
        setHtmlCode(htmlCode);
        setCssCode(cssCode);
        setJsCode(jsCode);
    }, []);

    const saveProgram = async () => {
        const id = `${Date.now()}`
        const _doc = {
            id: id,
            title: title,
            html: htmlCode,
            css: cssCode,
            js: jsCode,
            output: iframeSrcDoc,
            user: user,
        }

        await setDoc(doc(db, "Projects", id), _doc)
            .then(() => {
                setSavedAlert(true);
                setTimeout(() => {
                    setSavedAlert(false);
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
            <AnimatePresence>
                {savedAlert && <Alert status={"Success"} alertMessage={"Project Saved"} />}
            </AnimatePresence>
            <header className="w-full flex items-center justify-between px-12">
                <div className="flex items-center justify-center gap-6">
                    <Link to={"/home/projects"}>
                        <div className="flex mt-1  ">
                            <img src={Logo} alt="" className='w-10 h-auto object-contain' />
                            <h1 className='text-white text-xl align pt-1'>&nbsp;CodeCraft</h1>
                        </div>
                    </Link>

                    <div className="flex flex-col item-start justify-content">
                        <div className="flex items-center justify-center gap-3">
                            <AnimatePresence>
                                {isTitle ?
                                    <motion.input
                                        key={"titleInput"}
                                        type="text"
                                        placeholder='your title'
                                        value={title}
                                        onChange={(e) => setTitle((e.target.value))}
                                        className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none' />
                                    :
                                    <motion.p key={"titleLabel"} className='px-3 py-2 text-white text-lg'>
                                        {title}
                                    </motion.p>
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {isTitle ?
                                    <motion.div key={"MdCheck"} whileTap={{ scale: 0.9 }} className='cursor-pointer' onClick={() => setIsTitle(false)}>
                                        <MdCheck className='text-2xl text-emerald-500' />
                                    </motion.div>
                                    :
                                    <motion.div key={"MdEdit"} whileTap={{ scale: 0.9 }} className='cursor-pointer' onClick={() => setIsTitle(true)}>
                                        <MdEdit className='text-2xl text-primaryText' />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                        <div className="flex item-center justify-center px-3 mt-2 gap-2 ">
                            <p className="text-primaryText text-sm">
                                {user?.displayName ? user?.displayName : `${user?.email.split("@")[0]}`}
                            </p>
                            <motion.p whileTap={{ scale: 0.9 }} className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold'>+ Follow</motion.p>
                        </div>
                    </div>

                </div>
                <div className="flex items-center gap-4 end-0">
                    {user && (
                        <div className="flex items-center gap-4">
                            <motion.button whileTap={{ scale: 0.9 }} onClick={saveProgram} className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md">
                                Save
                            </motion.button>
                            <UserProfileDetails />
                        </div>
                    )}
                </div>
            </header>
            <div>
                <SplitPane split="horizontal" minSize={100} maxSize={-100} defaultSize="50%">
                    <SplitPane split="vertical" minSize={500}>
                        <CodePane
                            icon={<FaHtml5 />}
                            color="text-red-500"
                            language="HTML"
                            value={htmlCode}
                            onChange={setHtmlCode}
                        />
                        <SplitPane split="vertical" minSize={500}>
                            <CodePane
                                icon={<FaCss3 />}
                                color="text-sky-500"
                                language="CSS"
                                value={cssCode}
                                onChange={setCssCode}
                            />
                            <CodePane
                                icon={<FaJs />}
                                color="text-yellow-500"
                                language="JS"
                                value={jsCode}
                                onChange={setJsCode}
                            />
                        </SplitPane>
                    </SplitPane>
                    <div className="bg-white w-full h-full overflow-hidden">
                        <iframe
                            srcDoc={iframeSrcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            width="100%"
                            height="100%"
                            className='border-none'
                        ></iframe>
                    </div>
                </SplitPane>
            </div>
        </div>
    );
}

export default NewProject;
