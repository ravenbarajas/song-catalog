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
        $catalogNumber = $row['catalogNumber'] ?? null;
        $ivoryMusicUPCNumber = $row['ivoryMusicUPCNumber'] ?? null;
        $albumOrDigitalSingle = $row['albumOrDigitalSingle'] ?? null;
        $isrcFormat = $row['isrcFormat'] ?? null;
        $songTitles = $row['songTitles'] ?? null;
        $trackSequence = $row['trackSequence'] ?? null;
        $trackPrimaryArtistName = $row['trackPrimaryArtistName'] ?? null;
        $releaseType = $row['releaseType'] ?? null;
        $label = $row['label'] ?? null;
        $songVersion = $row['songVersion'] ?? null;
        $songGenre = $row['songGenre'] ?? null;
        $trackLanguage = $row['trackLanguage'] ?? null;
        $trackParentalAdvisory = $row['trackParentalAdvisory'] ?? null;
        $releasingTerritories = $row['releasingTerritories'] ?? null;
        $excludedTerritories = $row['excludedTerritories'] ?? null;
        $originalReleaseDate = $row['originalReleaseDate'] ?? null;
        $recordingLocation = $row['recordingLocation'] ?? null;
        $trackRecordingYear = $row['trackRecordingYear'] ?? null;
        $publisher = $row['publisher'] ?? null;
        $composers = $row['composers'] ?? null;
        $producer = $row['producer'] ?? null;
        $length = $row['length'] ?? null;

        // Check if a media record with the same catalogNumber already exists
        $existingMedia = Media::where('catalogNumber', $catalogNumber)->first();

        if (!$existingMedia && $catalogNumber !== null) {
            // Process each line as needed and save to the database
            return new Media([
                'catalogNumber' => $catalogNumber,
                'ivoryMusicUPCNumber' => $ivoryMusicUPCNumber,
                'albumOrDigitalSingle' => $albumOrDigitalSingle,
                'isrcFormat' => $isrcFormat,
                'songTitles' => $songTitles,
                'trackSequence' => $trackSequence,
                'trackPrimaryArtistName' => $trackPrimaryArtistName,
                'releaseType' => $releaseType,
                'label' => $label,
                'songVersion' => $songVersion,
                'songGenre' => $songGenre,
                'trackLanguage' => $trackLanguage,
                'trackParentalAdvisory' => $trackParentalAdvisory,
                'releasingTerritories' => $releasingTerritories,
                'excludedTerritories' => $excludedTerritories,
                'originalReleaseDate' => $originalReleaseDate,
                'recordingLocation' => $recordingLocation,
                'trackRecordingYear' => $trackRecordingYear,
                'publisher' => $publisher,
                'composers' => $composers,
                'producer' => $producer,
                'length' => $length,
            ]);
        } else {
            \Log::warning('Media with catalogNumber ' . $catalogNumber . ' already exists or catalogNumber is null.');
            return null; // Return null to skip adding this record
        }
    }
}
