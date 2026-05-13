<?php

namespace App\Http\Controllers;

use App\Http\Requests\VoteAnimeTriggerRequest;

class VoteController extends Controller
{
    public function voteAnimeTrigger(VoteAnimeTriggerRequest $request, int $triggerContentId)
    {
        dd($request->all());
    }
}
