<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('media', function (Blueprint $table) {
        $table->id();
        $table->string('catalog_number')->nullable();
        $table->string('ivory_music_upc_number')->nullable();
        $table->string('album_or_digital_single')->nullable();
        $table->string('isrc_format')->nullable();
        $table->string('song_titles')->nullable();
        $table->integer('track_sequence')->nullable();
        $table->string('track_primary_artist_name')->nullable();
        $table->string('release_type')->nullable();
        $table->string('label')->nullable();
        $table->string('song_version')->nullable();
        $table->string('song_genre')->nullable();
        $table->string('track_language')->nullable();
        $table->string('track_parental_advisory')->nullable();
        $table->string('releasing_territories')->nullable();
        $table->string('excluded_territories')->nullable();
        $table->date('original_release_date')->nullable();
        $table->string('recording_location')->nullable();
        $table->year('track_recording_year')->nullable();
        $table->string('publisher')->nullable();
        $table->string('composer')->nullable();
        $table->string('producer')->nullable();
        $table->string('length')->nullable();
        $table->text('notes')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media_table_nullable');
    }
};
