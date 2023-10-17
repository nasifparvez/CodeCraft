import React, { useState } from 'react';
import { FaEye, FaEnvelope, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

function UserAuthInputComponent({ label, placeHolder, isPass, Icon, setStateFunction, setGetEmailValidationStatus }) {
    const [value, setValue] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const handleTextChange = (e) => {
        setValue(e.target.value)
        setStateFunction(e.target.value)

        if (label === 'Email') {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const status = emailRegex.test(value)
            setIsEmailValid(status)
            setGetEmailValidationStatus(status)

        }
    }

    return (
        <div className="flex flex-col items-start justify-start gap-1">
            <label className='text-sm text-gray-300'>{label}</label>
            <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 ${!isEmailValid && label === 'Email' && value.length > 0 &&
                "border-2 border-red-500"
                }`}>
                {Icon && <Icon className="text-text555 text-2xl" />}
                <input
                    type={isPass && showPass ? 'password' : 'text'}
                    name="" id="" placeholder={placeHolder} className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent"
                    value={value}
                    onChange={handleTextChange} />
                {isPass && (
                    <motion.div onClick={() => setShowPass(!showPass)} whileTap={{ scale: 0.9 }} className="cursor-pointer">
                        {showPass ? <FaEyeSlash className="text-text555 text-2xl"></FaEyeSlash> : <FaEye className="text-text555 text-2xl" />
                        }
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default UserAuthInputComponent;
