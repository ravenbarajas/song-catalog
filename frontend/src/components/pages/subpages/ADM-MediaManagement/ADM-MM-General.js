import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../../../css/subpages/ADM-MediaManagement/ADM-MM-General.css';
import axios from 'axios';

const General = () => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [mediaData, setMediaData] = useState([]); // To store fetched media data

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

                const sheetHeaders = jsonData[0];
                const dataRows = jsonData.slice(1);

                const formattedData = dataRows.map((row) =>
                    sheetHeaders.reduce((obj, key, index) => {
                        obj[key] = row[index];
                        return obj;
                    }, {})
                );

                setHeaders(sheetHeaders);

                const nonEmptyRows = formattedData.filter((row) =>
                    Object.values(row).some((cell) => cell !== undefined && cell !== null && cell !== "")
                );

                setTableData(nonEmptyRows);
                setFilteredTableData(nonEmptyRows);

                setFileUploaded(selectedFile);
            };

            reader.readAsArrayBuffer(selectedFile);
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
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>Search</button>
            </div>
            <div className='ADM-MM-General-body'>
                <div className='ADM-MM-General-tbl-section'>
                    <table>
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {headers.map((header, colIndex) => (
                                                <td key={colIndex}>{row[header]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                    </table>
                </div>
                <div className='ADM-MM-General-ctrl-section'>
                    <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
                    {tableData.length > 0 && (
                        <div>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    )}
                </div>
            </div>
            <div className='ADM-MM-General-footer'>
                
            </div>
        </div>
    );
};

export default General;