<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'applications';

    /**
        Relations
     */
    public function applicants()
    {
        return $this->belongsTo('App\Applicant','applicant_id','id');
    }



}
