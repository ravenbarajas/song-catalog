<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
    public function up() {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('catalogNumber');
            $table->string('ivoryMusicUPCNumber');
            $table->string('albumOrDigitalSingle');
            $table->string('isrcFormat');
            $table->string('songTitles');
            $table->integer('trackSequence');
            $table->string('trackPrimaryArtistName');
            $table->string('releaseType');
            $table->string('label');
            $table->string('songVersion');
            $table->string('songGenre');
            $table->string('trackLanguage');
            $table->string('trackParentalAdvisory');
            $table->string('releasingTerritories');
            $table->string('excludedTerritories');
            $table->date('originalReleaseDate');
            $table->string('recordingLocation');
            $table->year('trackRecordingYear');
            $table->string('publisher');
            $table->string('composers');
            $table->string('producer');
            $table->time('length');
            $table->text('notes');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('media');
    }
}
