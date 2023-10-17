import React, { useState } from 'react';
import { HiChevronDoubleLeft } from 'react-icons/hi2';
import { FaSearchengin } from 'react-icons/fa6';
import { MdHome } from 'react-icons/md';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Logo from '../assets/codecraft.png';
import { Routes, Route } from 'react-router-dom';
import Projects from './Projects';
import Authentication from './AuthenticationPage';
import { useSelector } from 'react-redux';
import { UserProfileDetails } from './User-Components';
import { SET_SEARCH_TERM } from '../context/actions/searchActions'
import { useDispatch } from 'react-redux';


function Home() {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const [flipIcon, setFlipIcon] = useState(false);
    const user = useSelector(state => state.user?.user);
    const searchTerm = useSelector((state) => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")
    const dispatch = useDispatch()

    const toggleIconFlip = () => {
        setIsSideMenu(!isSideMenu);
        setFlipIcon(!flipIcon);
    };

    return (
        <>
            <div className={`w-2 ${isSideMenu ? 'w-2' : 'flex-[.2] xl:flex-[.4]'} min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleIconFlip}
                    className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: flipIcon ? -1 : 1 }}
                >
                    <HiChevronDoubleLeft className="text-white text-xl" />
                </motion.div>
                <div className='overflow-hidden w-full flex flex-col gap-4 items-center'>
                    <Link to={"/home"}>
                        <img src={Logo} alt="" className='object-contain w-20 h-auto ml-9' />
                        <h1 className='text-white text-3xl'>CodeCraft</h1>
                    </Link>
                    <Link to={'/newProject'}>
                        <div className="group">
                            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group-hover:border-gray-200">
                                <p className='text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
                            </div>
                        </div>
                    </Link>
                    {user && (
                        <Link to='/home/projects' className='flex items-center justify-center gap-6'>
                            <MdHome className='text-primaryText text-xl' />
                            <p className='text-lg text-primaryText'>Home</p>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className='flex-1 bg-secondary px-4 py-3 rounded-md flex items-center justify-center gap-3'>
                        <FaSearchengin className='text-2xl text-primaryText'></FaSearchengin>
                        <input
                            type='text'
                            value={searchTerm}
                            className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText'
                            placeholder='Search Projects Here...'
                            onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
                        ></input>
                    </div>
                    {!user && (
                        <motion.div whileTap={{ scale: 0.9 }} className='flex items-center justify-center gap-3'>
                            <Link to={"/home/auth"} className='bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover-bg-emerald-700'>
                                Sign Up
                            </Link>
                        </motion.div>
                    )}
                    {user && (<UserProfileDetails />)}
                </div>

                <div className="w-full">
                    <Routes>
                        <Route path='/*' element={<Projects />}></Route>
                        <Route path='/auth' element={<Authentication />}></Route>
                    </Routes>
                </div>
            </div >
        </>
    );
}

export default Home;
