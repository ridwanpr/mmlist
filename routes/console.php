<?php

use App\Jobs\ExtractAiredData;
use App\Jobs\FetchAiringAnime;
use App\Jobs\GenerateGeminiAdvisory;
use App\Jobs\SyncAnimeRelation;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new FetchAiringAnime)->dailyAt(1);
Schedule::job(new ExtractAiredData)->dailyAt(2);
Schedule::job(new SyncAnimeRelation)->weekly();

Schedule::job((new GenerateGeminiAdvisory)->onQueue('gemini'))
    ->cron('* * */2 * *')
    ->between('2:00', '4:00');

Artisan::command('extract:fromto', function () {
    $this->info('Dispatching extraction job to the queue...');

    ExtractAiredData::dispatch();

    $this->info('Job dispatched! Make sure your queue worker is running.');
})->purpose('Extract aired JSON data to dedicated columns');
