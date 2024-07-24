<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\MediaImport;
use App\Models\Media;

class MediaController extends Controller
{
    public function index() {
        return Media::all();
    }

    public function upload(Request $request)
    {
        // Validate the file
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        // Import the file
        Excel::import(new MediaImport, $request->file('file'));

        return response()->json(['message' => 'File imported successfully'], 200);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');
        $media = Media::where('album', 'like', "%$query%")
                      ->orWhere('song_titles', 'like', "%$query%")
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
