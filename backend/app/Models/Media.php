<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'catalogNumber',
        'ivoryMusicUPCNumber',
        'albumOrDigitalSingle',
        'isrcFormat',
        'songTitles',
        'trackSequence',
        'trackPrimaryArtistName',
        'releaseType',
        'label',
        'songVersion',
        'songGenre',
        'trackLanguage',
        'trackParentalAdvisory',
        'releasingTerritories',
        'excludedTerritories',
        'originalReleaseDate',
        'recordingLocation',
        'trackRecordingYear',
        'publisher',
        'composers',
        'producer',
        'length',
        'notes',
    ];
    
    
}
