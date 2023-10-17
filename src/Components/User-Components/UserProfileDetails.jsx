import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from 'react-icons/fa6';
import { MenuItems } from '../../utils/helper';
import { signOutAction } from '../../utils/helper';

function UserProfileDetails() {
    const user = useSelector(state => state.user?.user);
    const [isMenu, setisMenu] = useState(false);

    const chevronRotate = isMenu ? 180 : 0;

    return (
        <div className="flex items-center justify-center gap-4 relative">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
                {
                    user?.photoURL ?
                        <motion.img whileHover={{ scale: 1.2 }} src={user?.photoURL} alt={user?.displayName} className='w-full h-full object-cover' />
                        :
                        <p className="text-xl text-white font-semibold capitalize flex items-center justify-center">{user?.email[0]}</p>
                }
            </div>
            <motion.div
                onClick={() => setisMenu(!isMenu)}
                whileTap={{ scale: 0.9 }}
                initial={{ rotate: 0 }}
                animate={{ rotate: chevronRotate }}
                transition={{ type: 'tween', duration: 0.2 }}
                className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'
            >
                <FaChevronDown className='text-primaryText' />
            </motion.div>
            <AnimatePresence>
                {isMenu && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md x-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
                        {MenuItems && MenuItems.map(menuItem => (
                            <Link to={menuItem.uri} key={menuItem.id} className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md">
                                {menuItem.name}
                            </Link>
                        ))}
                        <motion.p
                            onClick={signOutAction}
                            whileTap={{ scale: 0.9 }}
                            className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                        >
                            Sign Out
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserProfileDetails
