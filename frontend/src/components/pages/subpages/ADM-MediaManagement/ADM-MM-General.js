import React, { useEffect, useState, useRef  } from 'react';
import * as XLSX from 'xlsx';
import '../../../css/subpages/ADM-MediaManagement/ADM-MM-General.css';
import axios from 'axios';
import PreviewModal from '../../../modals/UploadPreviewModal'; // Adjust the path as needed

const General = () => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [isPreview, setIsPreview] = useState(false);
    const fileInputRef = useRef(null);
    
    const [isLoading, setIsLoading] = useState(true); // To handle loading state
    const [isEmpty, setIsEmpty] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [searchQuery, setSearchQuery] = useState('');
    const [mediaData, setMediaData] = useState([]); // To store fetched media data

    // Function to render table headers
    const renderTableHeaders = () => (
        <thead>
            <tr>
                {columns.map(
                    (column) =>
                        columnVisibility[column] && (
                            <th key={column}>{columnMapping[column]}</th>
                        )
                )}
            </tr>
        </thead>
    );

    // Function to render table rows
    const renderTableRows = () => (
        <tbody>
            {currentTableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column) =>
                        columnVisibility[column] ? (
                            <td key={column}>{row[columnMapping[column]] || 'N/A'}</td>
                        ) : null
                    )}
                </tr>
            ))}
        </tbody>
    );

    // Define the groups and their columns
    const columnGroups = {
        'General Details': ['catalogNumber', 'ivoryMusicUPCNumber', 'albumOrDigitalSingle', 'isrcFormat', 'songTitles', 'trackSequence', 'trackPrimaryArtistName'],
        'Release Information': ['originalReleaseDate','releaseType', 'label', 'songVersion', 'songGenre', 'trackLanguage', 'trackParentalAdvisory'],
        'Publishing': ['publisher', 'composers', 'producer',],
        'Others': ['releasingTerritories', 'excludedTerritories', 'recordingLocation', 'trackRecordingYear', 'length', 'notes'],
    };
    
    const columns = [
        'catalogNumber', 'ivoryMusicUPCNumber', 'albumOrDigitalSingle', 'isrcFormat', 'songTitles', 'trackSequence',
        'trackPrimaryArtistName', 'releaseType', 'label', 'songVersion', 'songGenre', 'trackLanguage', 'trackParentalAdvisory',
        'releasingTerritories', 'excludedTerritories', 'originalReleaseDate', 'recordingLocation', 'trackRecordingYear',
        'publisher', 'composers', 'producer', 'length', 'notes',
    ];

    const [columnVisibility, setColumnVisibility] = useState(
        columns.reduce((acc, column) => ({ ...acc, [column]: true }), {})
    );

    const [expandedGroups, setExpandedGroups] = useState({});

    const handleCheckboxChange = (column) => {
        const updatedVisibility = { ...columnVisibility, [column]: !columnVisibility[column] };
        setColumnVisibility(updatedVisibility);
    };

    const handleGroupCheckboxChange = (groupColumns, checked) => {
        const updatedVisibility = { ...columnVisibility };
        groupColumns.forEach((column) => {
            updatedVisibility[column] = checked;
        });
        setColumnVisibility(updatedVisibility);
    };

    const toggleGroupExpansion = (groupName) => {
        setExpandedGroups((prevExpandedGroups) => ({
            ...prevExpandedGroups,
            [groupName]: !prevExpandedGroups[groupName],
        }));
    };

    const renderGroup = (groupName, groupColumns) => (
        <div key={groupName} className="column-group">
            <div className="group-label-container">
                <div className='group-label-expand'>
                    <button
                        className={`group-toggle-btn ${expandedGroups[groupName] ? 'expanded' : ''}`}
                        onClick={() => toggleGroupExpansion(groupName)}
                    >
                        {expandedGroups[groupName] ? '-' : '+'}
                    </button>
                </div>
                <label className="group-label">
                    <input
                        type="checkbox"
                        checked={groupColumns.every((column) => columnVisibility[column])}
                        onChange={(e) => handleGroupCheckboxChange(groupColumns, e.target.checked)}
                    />
                    &nbsp;{groupName}
                </label>
            </div>
            {expandedGroups[groupName] && groupColumns.map((column) => (
                <div className='checkbox-wrapper' key={column}>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id={column}
                            checked={columnVisibility[column]}
                            onChange={() => handleCheckboxChange(column)}
                        />
                        <label htmlFor={column} className="checkbox-label">
                            {columnMapping[column]}
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
    
    // State to control modal visibility
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // Trigger function to open the preview modal
    const handlePreview = () => {
        setIsPreviewModalOpen(true);
    };
    // Trigger function to close the preview modal
    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
    };

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/media');
            const data = await response.json();

            if (data.length === 0) {
                setIsEmpty(true);
                setHeaders([]);
                setTableData([]);
                return;
            }

            const dataHeaders = Object.keys(data[0] || {});
            const filteredHeaders = dataHeaders.filter(col => columnMapping[col]);
            const mappedHeaders = filteredHeaders.map(col => columnMapping[col]);

            const filteredData = data.map(row =>
                filteredHeaders.reduce((obj, key) => {
                    obj[columnMapping[key]] = row[key];
                    return obj;
                }, {})
            );

            setHeaders(mappedHeaders);
            setTableData(filteredData);
            setFilteredTableData(filteredData);
            setIsEmpty(false); // Data is available
        } catch (error) {
            console.error('Error fetching table data', error);
            setIsEmpty(true); // Set empty state on error
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [currentPage, rowsPerPage]);
    
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentTableData = tableData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

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

    const columnMapping = {
        catalogNumber: 'Catalog Number',
        ivoryMusicUPCNumber: 'UPC Number',
        albumOrDigitalSingle: 'Album / Digital Single',
        isrcFormat: 'ISRC Format',
        songTitles: 'Song Titles',
        trackSequence: 'Track Sequence',
        trackPrimaryArtistName: 'Artist Name',
        releaseType: 'Release Type',
        label: 'Label',
        songVersion: 'Song Version',
        songGenre: 'Genre',
        trackLanguage: 'Language',
        trackParentalAdvisory: 'Parental Advisory',
        releasingTerritories: 'Releasing Territories',
        excludedTerritories: 'Excluded Territories',
        originalReleaseDate: 'Original Release Date',
        recordingLocation: 'Recording Location',
        trackRecordingYear: 'Recording Year',
        publisher: 'Publisher',
        composers: 'Composers',
        producer: 'Producer',
        length: 'Length',
        notes: 'Notes',
    };
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            const allowedExtensions = ['xlsx', 'xls', 'csv'];
    
            if (!allowedExtensions.includes(fileExtension)) {
                alert('Only .xlsx, .xls, and .csv files are supported. Please choose a valid file.');
                return;
            }
    
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
                if (jsonData.length === 0) {
                    alert('The selected file is empty.');
                    setIsPreview(false);
                    return;
                }

                const sheetHeaders = jsonData[0];
                const dataRows = jsonData.slice(1);
    
                const formattedData = dataRows.map((row) =>
                    sheetHeaders.reduce((obj, key, index) => {
                        obj[key] = row[index];
                        return obj;
                    }, {})
                );
    
                // Filter out rows that are empty
                const nonEmptyRows = formattedData.filter((row) =>
                    Object.values(row).some((cell) => cell !== undefined && cell !== null && cell !== "")
                );
    
                // Update state
                setHeaders(sheetHeaders);
                setTableData(nonEmptyRows);
                setFilteredTableData(nonEmptyRows);
                setIsPreview(true); // Set preview mode on
                setIsPreviewModalOpen(true); // Open the modal
                setFileUploaded(selectedFile);
            };
    
            reader.readAsArrayBuffer(selectedFile);
        }
    };
    
    const handleCancel = () => {
        setHeaders([]);
        setTableData([]);
        setFilteredTableData([]);
        setIsPreview(false); // Turn off preview mode
        setFileUploaded(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
            fetchData();
        }
    };
 
    const handleSave = async () => {
        try {
            if (!fileUploaded) {
                alert('Please upload a file before saving.');
                return;
            }
    
            const response = await fetch('http://localhost:8000/api/media/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Ensure you accept JSON responses
                },
                body: JSON.stringify({ tableData }),
            });
    
            if (response.ok) {
                console.log('Table data saved successfully');
                alert('Catalog data saved successfully');
    
                // Reset state after saving
                setHeaders([]);
                setTableData([]);
                setFilteredTableData([]);
                setIsPreview(false);
                setFileUploaded(null);

                // Reset the file input value
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
        
                // Fetch updated data from API
                fetchData(); // Ensure to fetch new data after saving
            } else {
                console.error('Failed to save table data');
                const errorData = await response.json();
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error saving or fetching table data', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/media', {
                params: { query: searchQuery }
            });
            setMediaData(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching media data:', error);
            alert('Failed to fetch media data');
        }
    };

    return (
        <div className='ADM-MM-General-container'>
            <div className='ADM-MM-General-header'>
                <div className='ADM-MM-General-header-ctrl'>
                    <div className='ADM-MM-General-header-search'>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>
                    <div className='ADM-MM-General-header-upload'>
                        <input 
                            type="file" 
                            accept=".xlsx, .xls, .csv" 
                            ref={fileInputRef}
                            onChange={handleFileChange} />
                        {isPreview && (
                            <div>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='ADM-MM-General-header-filter'>
                    <div className='filter-controls'>
                        {Object.entries(columnGroups).map(([groupName, groupColumns]) =>
                            renderGroup(groupName, groupColumns)
                        )}
                    </div>
                </div>
                <div className='ADM-MM-General-header-ctrl'>
                    <div className='pagination-controls'>
                        <button className="btn-firstpage" onClick={handleFirstPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-backward-fast"></i>
                        </button>
                        <button className="btn-prevpage" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <i className="fa-solid fa-caret-left"></i>
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button className="btn-nextpage" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                        <button className="btn-lastpage" onClick={handleLastPage} disabled={currentPage === totalPages}>
                            <i className="fa-solid fa-forward-fast"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='ADM-MM-General-body'>
                <div className='ADM-MM-General-tbl-section'>
                    <div className={`ADM-MM-General-tbl-container ${isEmpty ? 'no-data' : ''}`}>
                        {isLoading ? (
                            <div className='loading-indicator'>Loading...</div>
                        ) : isEmpty ? (
                            <div className='no-data-indicator'>No data available</div>
                        ) : (
                            <>
                                {isPreview && <div className='preview-indicator'>Preview</div>}
                                <table className='gen-media-tbl'>
                                    {renderTableHeaders()}
                                    {renderTableRows()}
                                </table>
                            </>
                        )}
                    </div>

                </div>
            </div>
            <div className='ADM-MM-General-footer'>
                
            </div>
            {isPreviewModalOpen && (
                    <div className="preview-modal-overlay">
                        <PreviewModal
                            isOpen={isPreviewModalOpen}
                            onRequestClose={closePreviewModal}
                            previewData={filteredTableData}
                            headers={headers}
                        />
                    </div>
                )}
        </div>
    );
};

export default General;