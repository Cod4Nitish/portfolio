import React, { useState, useEffect } from 'react';
import '../styles/custom-cursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setClicked(true);
        const handleMouseUp = () => setClicked(false);

        // Detect hover over clickable elements
        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('input-field')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <div
                className={`cursor-dot ${isHovering ? 'hovering' : ''} ${clicked ? 'clicked' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
            <div
                className={`cursor-outline ${isHovering ? 'hovering' : ''} ${clicked ? 'clicked' : ''}`}
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
        </>
    );
};

export default CustomCursor;
