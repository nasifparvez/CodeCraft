import React from 'react';
import { motion } from 'framer-motion';
import { MdBookmark } from 'react-icons/md';

function ProjectCard(props) {
    return (
        <motion.div key={props.index} className='w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col' inital={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: props.index * 0.1 }}>
            <div className="bg-primary w-full h-[70%] rounded-md overflow-hidden" style={{ overflow: 'hidden', height: '100%' }}>
                <iframe
                    srcDoc={props.project.output}
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                    className='border-none'
                ></iframe>
            </div>
            <div className="flex items-start mt-2">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500 mt-1">
                    {props.project.user?.photoURL ? (
                        <motion.img whileHover={{ scale: 1.2 }} src={props.project.user?.photoURL} alt={props.project.user?.displayName} className='w-full h-full object-cover' />
                    ) : (
                        <p className="text-xl text-white font-semibold capitalize flex items-center justify-center">{props.project.user?.email[0]}</p>
                    )}
                </div>
                <div className="ml-4 mt-1 flex-col" >
                    <p className='text-white text-lg capitalize'>
                        {props.project?.title}
                    </p>
                    <p className='text-primaryText text-sm capitalize'>
                        {props.project?.user?.displayName ? props.project?.user.displayName : `${props.project?.user?.email.split("@")[0]}`}
                    </p>
                </div>
                <motion.div
                    className="cursor-pointer ml-auto mt-2"
                    whileTap={{ scale: 0.9 }}>
                    <MdBookmark className="text-primaryText text-3x1" />
                </motion.div>
            </div>

        </motion.div >
    );
}

export default ProjectCard;
