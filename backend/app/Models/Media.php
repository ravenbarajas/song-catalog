<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'catalog_number',
        'ivory_music_upc_number',
        'album_or_digital_single',
        'isrc_format',
        'song_titles',
        'track_sequence',
        'track_primary_artist_name',
        'release_type',
        'label',
        'song_version',
        'song_genre',
        'track_language',
        'track_parental_advisory',
        'releasing_territories',
        'excluded_territories',
        'original_release_date',
        'recording_location',
        'track_recording_year',
        'publisher',
        'composer',
        'producer',
        'length',
        'notes',
    ];
    
}
