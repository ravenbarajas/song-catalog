import React, { useState, useRef} from 'react';
import Modal from 'react-modal';
import '../css/modals/UploadPreviewModal.css'

Modal.setAppElement('#root'); // Make sure to set the app element for accessibility

const PreviewModal = ({ isOpen, onRequestClose, previewData, headers }) => {
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const [isPreview, setIsPreview] = useState(false);

    // Calculate total pages and slice data for the current page
    const totalPages = Math.ceil(previewData.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentData = previewData.slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const fileInputRef = useRef(null);

    return (
        <div className='preview-modal'>
            <div className='preview-modal-header'>
                <div className='preview-modal-header-title'>

                </div>
                <div className='preview-modal-header-upload'>

                </div>
                <div className='preview-modal-header-ctrl'>
                    <div className='pagination-controls'>
                        <button onClick={handleFirstPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-backward-fast"></i>
                        </button>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-caret-left"></i>
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-forward-fast"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='preview-modal-body'>
                <div className='preview-modal-tbl-section'>
                    <div className='preview-model-tbl-container'>
                        <button onClick={onRequestClose} className="modal-close-btn">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                        <h2>Upload Preview</h2>
                        <div className='table-scroll-container'>
                            <table className='preview-tbl'>
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.length > 0 ? (
                                        currentData.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {headers.map((header, colIndex) => (
                                                    <td key={colIndex}>{row[header]}</td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={headers.length}>No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;
