import React, { useState } from 'react';
import Logo from '../assets/codecraft.png';
import UserAuthInputComponent from './User-Components/UserAuthInputComponent'
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md'
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from 'react-icons/fc'
import { signInWithGithub, signInWithGoogle } from '../utils/helper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';

function Authentication() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
    const [isLogin, setisLogin] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")


    const createNewUser = async () => {
        if (getEmailValidationStatus) {
            await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
                if (userCred) {
                }
            }).catch((err) => {
                console.log(err.message)
                let errorMessage = "";
                if (err.code.includes("auth/email-already-in-use")) {
                    errorMessage = "Email is already in use. Please sign in or reset your password.";
                } else if (err.code.includes("auth/invalid-email")) {
                    errorMessage = "Invalid email address.";
                } else if (err.code.includes("auth/operation-not-allowed")) {
                    errorMessage = "Email/password accounts are not enabled. Please contact support.";
                } else if (err.code.includes("auth/weak-password")) {
                    errorMessage = "Weak password. Please use a stronger password.";
                } else {
                    errorMessage = "An error occurred while signing up.";
                }
                setAlertMessage(errorMessage);
                setAlert(true);
                setInterval(() => {
                    setAlert(false);
                }, 4000)
            })
        }
    }

    const loginWithEmailPassword = async () => {
        if (getEmailValidationStatus) {
            await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
                if (userCred) {
                }
            }).catch((err) => {
                console.log(err.message)
                let alertMessage = "";
                if (err.message.includes("invalid-email")) {
                    alertMessage = "Invalid email address.";
                } else if (err.message.includes("user-disabled")) {
                    alertMessage = "Your account has been disabled.";
                } else if (err.message.includes("user-not-found")) {
                    alertMessage = "User not found. Please sign up.";
                } else if (err.message.includes("wrong-password")) {
                    alertMessage = "Wrong password. Please try again.";
                } else if (err.code.includes("invalid-login-credentials")) {
                    alertMessage = "Invalid login credentials.";
                } else {
                    alertMessage = "An error occurred during login.";
                }

                setAlertMessage(alertMessage);
                setAlert(true);
                setInterval(() => {
                    setAlert(false);
                }, 4000)
            }
            )
        }
    }
    return (
        <div className='w-full py-6'>
            <div className='flex items-center'>
                <img src={Logo} alt="" className='object-contain w-10 h-auto opacity-40' />
                <h6 className='text-white opacity-40'>&nbsp;CodeCraft</h6>
            </div>
            <div className="w-full flex flex-col items-center justify-center ">
                {isLogin ? <p className='py-4 text-2xl text-primaryText'>Log In</p> : <p className='py-4 text-2xl text-primaryText text-center'>Sign Up</p>}
                <div className="px-8 w-full md-auto py-2 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-4">
                    <UserAuthInputComponent label='Email' placeHolder='Enter Email' isPass={false} key='Email' Icon={FaEnvelope} setStateFunction={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus}></UserAuthInputComponent>
                    <UserAuthInputComponent label='Password' placeHolder='Enter Password' isPass={true} key='Password' Icon={MdPassword} setStateFunction={setPassword}></UserAuthInputComponent>

                    <AnimatePresence>
                        {alert && (<motion.p key={"Alert Message"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='text-red-500'> {alertMessage}
                        </motion.p>)}
                    </AnimatePresence>

                    {isLogin ? <motion.div onClick={loginWithEmailPassword} whileTap={{ scale: 0.9 }} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover-bg-emerald-700'>
                        <p className="text-xl text-white">Log In</p>
                    </motion.div> : <motion.div onClick={createNewUser} whileTap={{ scale: 0.9 }} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover-bg-emerald-700'>
                        <p className="text-xl text-white">Sign Up</p>
                    </motion.div>}
                    {isLogin ?
                        <p className="text-sm text-primaryText flex items-center justify-center gap-3">Don't have an account? <span onClick={() => setisLogin(!isLogin)} className='text-emerald-500 cursor-pointer'>Sign Up</span></p> :
                        <p className="text-sm text-primaryText flex items-center justify-center gap-3">Already have an account? <span onClick={() => setisLogin(!isLogin)} className='text-emerald-500 cursor-pointer'>Login Here</span></p>}
                    <div className='flex items-center justify-center gap-12'>
                        <div className='h-[1px] bg-[rgba(255,255,255,0.2)] rounded-md w-24'></div>
                        <p className='text-sm text-[rgba(255,255,255,0.2)]'>OR</p>
                        <div className='h-[1px] bg-[rgba(255,255,255,0.2)] rounded-md w-24'></div>
                    </div>
                    <motion.div onClick={signInWithGoogle} whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(255,255,255,0.4)] cursor-pointer'>
                        <FcGoogle className='text3xl'></FcGoogle>
                        <p className='text-xl text-white'>Sign In With Google</p>
                    </motion.div>
                    <div className='flex items-center justify-center gap-12'>
                        <div className='h-[1px] bg-[rgba(255,255,255,0.2)] rounded-md w-24'></div>
                        <p className='text-sm text-[rgba(255,255,255,0.2)]'>OR</p>
                        <div className='h-[1px] bg-[rgba(255,255,255,0.2)] rounded-md w-24'></div>
                    </div>
                    <motion.div onClick={signInWithGithub} whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(255,255,255,0.4)]  cursor-pointer'>
                        <FaGithub className='text3xl'></FaGithub>
                        <p className='text-xl text-white'>Sign In With GitHub</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Authentication;
