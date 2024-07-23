<?php

namespace App\Imports;

use App\Models\Media; // Ensure you have the Media model
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MediaImport implements ToModel
{
    /**
     * Transform the row into a Media model instance.
     *
     * @param array $row
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Media([
            'catalog_number' => $row[0],
            'ivory_music_upc_number' => $row[1],
            'album' => $row[2],
            'isrc_format' => $row[3],
            'song_titles' => $row[4],
            'track_sequence' => $row[5],
            'track_primary_artist_name' => $row[6],
            'release_type' => $row[7],
            'label' => $row[8],
            'song_version' => $row[9],
            'song_genre' => $row[10],
            'track_language' => $row[11],
            'track_parental_advisory' => $row[12],
            'releasing_territories' => $row[13],
            'excluded_territories' => $row[14],
            'original_release_date' => $row[15],
            'recording_location' => $row[16],
            'track_recording_year' => $row[17],
            'publisher' => $row[18],
            'composers' => $row[19],
            'producer' => $row[20],
            'length' => $row[21],
            'notes' => $row[22],
        ]);
    }
}
