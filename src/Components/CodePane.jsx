import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

function CodePane({ icon, language, color, onChange, value }) {
    return (
        <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex items-center justify-between">
                <div className={`bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 ${color}`}>
                    {icon}
                    <p className="text-primaryText font-semibold">{language}</p>
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
                </div>
            </div>
            <div className="w-full px-2 h-full">
                {language === "JS" && (
                    <CodeMirror
                        value={value}
                        height="600px"
                        extensions={[javascript({ jsx: true })]}
                        theme="dark"
                        onChange={onChange}
                        options={{
                            lint: true,
                            lineWrapping: true,
                            mode: language,
                            lineNumbers: true,
                            theme: "material",
                        }}
                        basicSetup={{
                            foldGutter: false,
                            dropCursor: false,
                            allowMultipleSelections: false,
                            indentOnInput: false,
                        }}
                    />
                )}
                {language === "HTML" && (
                    <CodeMirror
                        value={value}
                        height="600px"
                        extensions={[
                            html({
                                config: {
                                    htmlMode: true,
                                    autoCloseTags: true,
                                    autoCloseBrackets: true,
                                    matchTags: true,
                                    matchBrackets: true,
                                },
                            }),
                        ]}
                        theme="dark"
                        options={{
                            lint: true,
                            lineWrapping: true,
                            mode: language,
                            lineNumbers: true,
                            theme: "material",
                        }}
                        basicSetup={{
                            foldGutter: false,
                            dropCursor: false,
                            allowMultipleSelections: false,
                            indentOnInput: false,
                        }}
                        onChange={onChange}
                    />
                )}
                {language === "CSS" && (
                    <CodeMirror
                        value={value}
                        height="600px"
                        extensions={[css()]}
                        theme="dark"
                        options={{
                            lint: true,
                            lineWrapping: true,
                            mode: language,
                            lineNumbers: true,
                            theme: "material",
                        }}
                        basicSetup={{
                            foldGutter: false,
                            dropCursor: false,
                            allowMultipleSelections: false,
                            indentOnInput: false,
                        }}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
}

export default CodePane;
