import React from 'react';
import "../css/ProductCard.css";
export default function Pagination ({ currentPage, totalPages, onPageChange }){
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div className="pagination">
            <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index + 1} 
                    onClick={() => handlePageChange(index + 1)} 
                    className={currentPage === index + 1 ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};