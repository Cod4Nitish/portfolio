import React, { useEffect, useState } from 'react';
import '../styles/loader.css';

const Loader = ({ onLoaded }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Artificial delay to show the nice animation
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                onLoaded();
            }, 500); // Wait for fade out animation
        }, 2000);

        return () => clearTimeout(timer);
    }, [onLoaded]);

    return (
        <div className={`loader-container ${isFading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <div className="cube-loader">
                    <div className="cube cube1"></div>
                    <div className="cube cube2"></div>
                    <div className="cube cube3"></div>
                    <div className="cube cube4"></div>
                </div>
                <div className="loader-text">
                    <span className="accent">&lt;</span>
                    Nitish.
                    <span className="accent">/&gt;</span>
                </div>
                <div className="loading-progress">
                    <div className="loading-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
