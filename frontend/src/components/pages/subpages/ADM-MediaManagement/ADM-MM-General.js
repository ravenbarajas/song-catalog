import React, { useState } from 'react';
import '../../../css/subpages/ADM-MediaManagement/ADM-MM-General.css';
import axios from 'axios';

const General = () => {
    const [file, setFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [mediaData, setMediaData] = useState([]); // To store fetched media data

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully');
            setFile(null); // Reset file input
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
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
                                <th>Catalog Number</th>
                                <th>Ivory Music UPC Number</th>
                                <th>Album / Digital Single</th>
                                <th>ISRC Format</th>
                                <th>Song Titles (Track Title)</th>
                                <th>Track Sequence</th>
                                <th>Track Primary Artist Name</th>
                                <th>Release Type (Album Format)</th>
                                <th>Label (CLine & PLine)</th>
                                <th>Song Version / Album Version / Track Version</th>
                                <th>Song Genre</th>
                                <th>Track Language</th>
                                <th>Track Parental Advisory</th>
                                <th>Releasing Territories</th>
                                <th>Excluded Territories</th>
                                <th>Original Release Date</th>
                                <th>Recording Location</th>
                                <th>Track Recording Year</th>
                                <th>Publisher</th>
                                <th>Composer/s</th>
                                <th>Producer</th>
                                <th>Length</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mediaData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.catalog_number}</td>
                                    <td>{item.ivory_music_upc_number}</td>
                                    <td>{item.album}</td>
                                    <td>{item.isrc_format}</td>
                                    <td>{item.song_titles}</td>
                                    <td>{item.track_sequence}</td>
                                    <td>{item.track_primary_artist_name}</td>
                                    <td>{item.release_type}</td>
                                    <td>{item.label}</td>
                                    <td>{item.song_version}</td>
                                    <td>{item.song_genre}</td>
                                    <td>{item.track_language}</td>
                                    <td>{item.track_parental_advisory}</td>
                                    <td>{item.releasing_territories}</td>
                                    <td>{item.excluded_territories}</td>
                                    <td>{item.original_release_date}</td>
                                    <td>{item.recording_location}</td>
                                    <td>{item.track_recording_year}</td>
                                    <td>{item.publisher}</td>
                                    <td>{item.composers}</td>
                                    <td>{item.producer}</td>
                                    <td>{item.length}</td>
                                    <td>{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='ADM-MM-General-ctrl-section'>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                    />
                    <button type="button" onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className='ADM-MM-General-footer'>
                
            </div>
        </div>
    );
};

export default General;