import { motion } from 'motion/react'

export const Loader = () => {
    return (
        <motion.svg
            animate={{ rotate: [0, 360] }}
            initial={{ scale: 0, width: 0, display: 'none' }}
            style={{ scale: 0.5, display: 'none' }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loader text-white">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
        </motion.svg>
    )
}
