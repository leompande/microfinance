<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'applicants';

    /**
     * Relationships
     */

    public function applications()
    {
        return $this->hasMany('App\Application','applicant_id');
    }


    public function sponsor()
    {
        return $this->hasOne('App\Sponsor','id','sponsor_id');
    }
}
