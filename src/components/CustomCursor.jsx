import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Spring physics for buttery smooth tracking
    const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const isClickable = e.target.closest('a') || 
                                e.target.closest('button') || 
                                e.target.closest('input') || 
                                e.target.closest('textarea');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                x: cursorX,
                y: cursorY,
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference' /* Jackie Hu blend mode effect */
            }}
        >
            {/* The outer elegant circle */}
            <motion.div
                animate={{
                    x: '-50%',
                    y: '-50%',
                    width: isHovering ? 80 : 24,
                    height: isHovering ? 80 : 24,
                    scale: isClicked ? 0.8 : 1,
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
                    border: isHovering ? '1px solid transparent' : '2px solid rgba(255, 255, 255, 1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Text inside cursor when hovering */}
                <motion.span
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    style={{
                        color: 'black',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}
                >
                    View
                </motion.span>
            </motion.div>
            
            {/* The tiny center dot */}
            <motion.div
                animate={{
                    x: '-50%',
                    y: '-50%',
                    opacity: isHovering ? 0 : 1,
                    scale: isClicked ? 1.5 : 1
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: 4,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }}
            />
        </motion.div>
    );
};

export default CustomCursor;
