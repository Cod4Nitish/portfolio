import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import '../styles/color-customizer.css';

const colors = [
    { name: 'Indigo / Purple', primary: '#6366f1', secondary: '#a855f7', glow: 'rgba(99, 102, 241, 0.4)' },
    { name: 'Emerald / Teal', primary: '#10b981', secondary: '#14b8a6', glow: 'rgba(16, 185, 129, 0.4)' },
    { name: 'Rose / Orange', primary: '#f43f5e', secondary: '#f97316', glow: 'rgba(244, 63, 94, 0.4)' },
    { name: 'Blue / Cyan', primary: '#3b82f6', secondary: '#06b6d4', glow: 'rgba(59, 130, 246, 0.4)' },
    { name: 'Amber / Red', primary: '#f59e0b', secondary: '#ef4444', glow: 'rgba(245, 158, 11, 0.4)' }
];

const ColorCustomizer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeColor, setActiveColor] = useState(0);

    const handleColorChange = (index) => {
        setActiveColor(index);
        const color = colors[index];

        // Update CSS variables on the root element
        document.documentElement.style.setProperty('--accent-primary', color.primary);
        document.documentElement.style.setProperty('--accent-secondary', color.secondary);
        document.documentElement.style.setProperty('--accent-glow', color.glow);
    };

    return (
        <div className={`color-customizer ${isOpen ? 'open' : ''}`}>
            <button
                className="customizer-toggle btn-icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Customize Colors"
            >
                {isOpen ? <X size={20} /> : <Settings size={20} className="spin-icon" />}
            </button>

            <div className="customizer-panel glass-panel">
                <h4>Theme Colors</h4>
                <div className="color-options">
                    {colors.map((color, index) => (
                        <button
                            key={color.name}
                            className={`color-btn ${activeColor === index ? 'active' : ''}`}
                            style={{
                                background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`
                            }}
                            onClick={() => handleColorChange(index)}
                            title={color.name}
                            aria-label={`Select ${color.name} theme`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorCustomizer;
