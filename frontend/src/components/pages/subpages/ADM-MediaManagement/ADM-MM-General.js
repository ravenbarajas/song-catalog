import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import '../../../css/subpages/ADM-MediaManagement/ADM-MM-General.css';
import axios from 'axios';

const General = () => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true); // To handle loading state
    const [isEmpty, setIsEmpty] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const [searchQuery, setSearchQuery] = useState('');
    const [mediaData, setMediaData] = useState([]); // To store fetched media data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/media');
                const data = await response.json();

                const dataHeaders = Object.keys(data[0] || {});
                const filteredHeaders = dataHeaders.filter(col => columnMapping[col]);

                setHeaders(filteredHeaders.map(col => columnMapping[col]));
                setTableData(data);
                setIsEmpty(data.length === 0);
            } catch (error) {
                console.error('Error fetching table data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    
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
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
    
        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target.result;
            const lines = csvData.split('\n');
            const result = [];
            const headers = lines[0].split(',');
    
            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentLine = lines[i].split(',');
    
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }
                result.push(obj);
            }
    
            const filteredHeaders = headers.filter(col => columnMapping[col]);
    
            setHeaders(filteredHeaders.map(col => columnMapping[col]));
            setTableData(result);
            setFileUploaded(true);
        };
        reader.readAsText(file);
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
                setFileUploaded(false);
    
                // Fetch updated data from API
                const updatedResponse = await fetch('http://localhost:8000/api/media');
                const updatedData = await updatedResponse.json();
    
                setHeaders(Object.keys(updatedData[0]));
                setTableData(updatedData);
                setFilteredTableData(updatedData);
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
                    <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                        {tableData.length > 0 && (
                            <div>
                                <button onClick={handleSave}>Save</button>
                            </div>
                        )}
                </div>
                <div className='ADM-MM-General-page-ctrl'>
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
                    <div className='ADM-MM-General-tbl-container'>
                        {isLoading ? (
                            <div className='loading-indicator'>Loading...</div>
                        ) : isEmpty ? (
                            <div className='no-data-indicator'>No data available</div>
                        ) : (
                        <table className='gen-media-tbl'>
                            <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {headers.map((header, colIndex) => (
                                            <td key={colIndex}>
                                                {row[Object.keys(columnMapping).find(key => columnMapping[key] === header)]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        )}
                    </div>

                </div>
            </div>
            <div className='ADM-MM-General-footer'>
                
                </div>
        </div>
    );
};

export default General;