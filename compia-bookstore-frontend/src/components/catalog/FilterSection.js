import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import '../../styles/FilterSection.css'

function FilterSection({ title, children }) {
    const [isOpen, setIsOpen ] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    return (
        <div className='filter-section'>
            {/* O header agor é um botão para ser clicável */}
            <button className='filter-section-header' onClick={toggleOpen}>
                <h4>{title}</h4>
                <span className='toggle-icon'>
                    {isOpen ? <FaChevronUp/> : <FaChevronDown/>}
                </span>
            </button>
            {isOpen && (
                <div className='filter-section-content'>
                    {children}
                </div>
            )}

        </div>
    )
}

export default FilterSection;