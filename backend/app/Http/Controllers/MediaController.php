<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\MediaImport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index() {
        return Media::all();
    }

    public function save(Request $request)
    {
        try {
            $tableData = $request->input('tableData');

            Log::info('Received table data: ' . json_encode($tableData));

            foreach ($tableData as $rowData) {
                // Skip header row or rows with empty data
                if (empty($rowData) || !isset($rowData['CATALOG NUMBER'])) {
                    continue;
                }

                // Convert numeric fields to strings
                if (isset($rowData['IVORY MUSIC UPC NUMBER'])) {
                    $rowData['IVORY MUSIC UPC NUMBER'] = (string)$rowData['IVORY MUSIC UPC NUMBER'];
                }
                if (isset($rowData['Length'])) {
                    $rowData['Length'] = (string)$rowData['Length'];
                }

                // Validate row data
                $validator = Validator::make($rowData, [
                    'CATALOG NUMBER' => 'required|string',
                    'IVORY MUSIC UPC NUMBER' => 'nullable|string',
                    'ALBUM / DIGITAL SINGLE' => 'nullable|string',
                    'ISRC FORMAT' => 'nullable|string',
                    'SONG TITLES (TRACK TITLE)' => 'nullable|string',
                    'TRACK SEQUENCE' => 'nullable|integer',
                    'TRACK PRIMARY ARTIST NAME' => 'nullable|string',
                    'RELEASE TYPE (ALBUM FORMAT)' => 'nullable|string',
                    'LABEL (CLine & PLine)' => 'nullable|string',
                    'SONG VERSION / ALBUM VERSION / TRACK VERSION' => 'nullable|string',
                    'SONG GENRE' => 'nullable|string',
                    'TRACK LANGUAGE' => 'nullable|string',
                    'TRACK PARENTAL ADVISORY' => 'nullable|string',
                    'RELEASING TERRITORIES' => 'nullable|string',
                    'EXCLUDED TERRITORIES' => 'nullable|string',
                    'ORIGINAL RELEASE DATE (YYYY-MM-DD)' => 'nullable|date',
                    'RECORDING LOCATION' => 'nullable|string',
                    'TRACK RECORDING YEAR' => 'nullable|integer',
                    'PUBLlSHER' => 'nullable|string',
                    'COMPOSER/S' => 'nullable|string',
                    'PRODUCER' => 'nullable|string',
                    'Length' => 'nullable|string',
                    'NOTES' => 'nullable|string',
                ]);

                if ($validator->fails()) {
                    Log::error('Validation failed for row: ' . json_encode($rowData));
                    Log::error('Validation errors: ' . json_encode($validator->errors()->toArray()));
                    continue;
                }

                // Convert originalReleaseDate to the correct format
                $originalReleaseDate = null;
                if (isset($rowData['ORIGINAL RELEASE DATE (YYYY-MM-DD)'])) {
                    $originalReleaseDate = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($rowData['ORIGINAL RELEASE DATE (YYYY-MM-DD)'])->format('Y-m-d');
                }

                Media::create([
                    'catalogNumber' => $rowData['CATALOG NUMBER'],
                    'ivoryMusicUPCNumber' => $rowData['IVORY MUSIC UPC NUMBER'] ?? null,
                    'albumOrDigitalSingle' => $rowData['ALBUM / DIGITAL SINGLE'] ?? null,
                    'isrcFormat' => $rowData['ISRC FORMAT'] ?? null,
                    'songTitles' => $rowData['SONG TITLES (TRACK TITLE)'] ?? null,
                    'trackSequence' => $rowData['TRACK SEQUENCE'] ?? null,
                    'trackPrimaryArtistName' => $rowData['TRACK PRIMARY ARTIST NAME'] ?? null,
                    'releaseType' => $rowData['RELEASE TYPE (ALBUM FORMAT)'] ?? null,
                    'label' => $rowData['LABEL (CLine & PLine)'] ?? null,
                    'songVersion' => $rowData['SONG VERSION / ALBUM VERSION / TRACK VERSION'] ?? null,
                    'songGenre' => $rowData['SONG GENRE'] ?? null,
                    'trackLanguage' => $rowData['TRACK LANGUAGE'] ?? null,
                    'trackParentalAdvisory' => $rowData['TRACK PARENTAL ADVISORY'] ?? null,
                    'releasingTerritories' => $rowData['RELEASING TERRITORIES'] ?? null,
                    'excludedTerritories' => $rowData['EXCLUDED TERRITORIES'] ?? null,
                    'originalReleaseDate' => $originalReleaseDate,
                    'recordingLocation' => $rowData['RECORDING LOCATION'] ?? null,
                    'trackRecordingYear' => $rowData['TRACK RECORDING YEAR'] ?? null,
                    'publisher' => $rowData['PUBLlSHER'] ?? null,
                    'composers' => $rowData['COMPOSER/S'] ?? null,
                    'producer' => $rowData['PRODUCER'] ?? null,
                    'length' => $rowData['Length'] ?? null,
                    'notes' => $rowData['NOTES'] ?? null,
                ]);
            }

            Log::info('Table data saved successfully');
            return response()->json(['message' => 'Table data saved successfully']);
        } catch (\Exception $e) {
            Log::error('Error saving table data: ' . $e->getMessage());
            Log::error('Error stack trace: ' . $e->getTraceAsString());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    public function search(Request $request)
    {
        $query = $request->input('query');
        $media = Media::where('albumOrDigitalSingle', 'like', "%$query%")
                      ->orWhere('songTitles', 'like', "%$query%")
                      // Add more conditions based on fields
                      ->get();

        return response()->json($media);
    }
    public function store(Request $request) {
        $media = Media::create($request->all());
        return response()->json($media, 201);
    }

    public function show($id) {
        return Media::find($id);
    }

    public function update(Request $request, $id) {
        $media = Media::findOrFail($id);
        $media->update($request->all());
        return response()->json($media, 200);
    }

    public function destroy($id) {
        Media::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
    
}
