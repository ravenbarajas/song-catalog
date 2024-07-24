<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Media;

class MediaImport implements ToModel
{
    use Importable;

    public function model(array $row)
    {
        // Extract values from the associative array
        $catalogNumber = $row['catalog_number'] ?? null;
        $ivoryMusicUpcNumber = $row['ivory_music_upc_number'] ?? null;
        $albumOrDigitalSingle = $row['album_or_digital_single'] ?? null;
        $isrcFormat = $row['isrc_format'] ?? null;
        $songTitles = $row['song_titles'] ?? null;
        $trackSequence = $row['track_sequence'] ?? null;
        $trackPrimaryArtistName = $row['track_primary_artist_name'] ?? null;
        $releaseType = $row['release_type'] ?? null;
        $label = $row['label'] ?? null;
        $songVersion = $row['song_version'] ?? null;
        $songGenre = $row['song_genre'] ?? null;
        $trackLanguage = $row['track_language'] ?? null;
        $trackParentalAdvisory = $row['track_parental_advisory'] ?? null;
        $releasingTerritories = $row['releasing_territories'] ?? null;
        $excludedTerritories = $row['excluded_territories'] ?? null;
        $originalReleaseDate = $row['original_release_date'] ?? null;
        $recordingLocation = $row['recording_location'] ?? null;
        $trackRecordingYear = $row['track_recording_year'] ?? null;
        $publisher = $row['publisher'] ?? null;
        $composer = $row['composer'] ?? null;
        $producer = $row['producer'] ?? null;
        $length = $row['length'] ?? null;
        $notes = $row['notes'] ?? null;

        // Check if a media entry with the same catalog number already exists
        $existingMedia = Media::where('catalog_number', $catalogNumber)->first();

        if (!$existingMedia && $catalogNumber !== null) {
            // Process each line as needed and save to the database
            return new Media([
                'catalog_number' => $catalogNumber,
                'ivory_music_upc_number' => $ivoryMusicUpcNumber,
                'album_or_digital_single' => $albumOrDigitalSingle,
                'isrc_format' => $isrcFormat,
                'song_titles' => $songTitles,
                'track_sequence' => $trackSequence,
                'track_primary_artist_name' => $trackPrimaryArtistName,
                'release_type' => $releaseType,
                'label' => $label,
                'song_version' => $songVersion,
                'song_genre' => $songGenre,
                'track_language' => $trackLanguage,
                'track_parental_advisory' => $trackParentalAdvisory,
                'releasing_territories' => $releasingTerritories,
                'excluded_territories' => $excludedTerritories,
                'original_release_date' => $originalReleaseDate,
                'recording_location' => $recordingLocation,
                'track_recording_year' => $trackRecordingYear,
                'publisher' => $publisher,
                'composer' => $composer,
                'producer' => $producer,
                'length' => $length,
                'notes' => $notes,
            ]);
        } else {
            \Log::warning('Media with catalog number ' . $catalogNumber . ' already exists or catalog number is null.');
            return null; // Return null to skip adding this record
        }
    }
}