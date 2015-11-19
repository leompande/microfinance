<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\FinancialTransaction;
class FinancialTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $financial_transactions = FinancialTransaction::all()->load("expenses","liabilities");
        return $financial_transactions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {  /// Add sponsor
        $finance = new FinancialTransaction();
        $finance->transaction_type = $request->type;
        if($request->type=="Expenses"){

            $finance->expens_id = $request->trans_id;
        }
        if($request->type=="Liabilities"){

            $finance->liab_id = $request->trans_id;
        }
        $finance->amount = $request->amount;

        if(!$finance->save()){
            return "failed";
            }else{
            return "success";
            }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $finance = FinancialTransaction::find($id);
        $finance->transaction_type = $request->transaction_type;
        if($request->type=="Expenses"){

            $finance->expens_id = $request->trans_id;
        }
        if($request->type=="Liabilities"){

            $finance->liab_id = $request->trans_id;
        }
        $finance->amount = $request->amount;

        if(!$finance->save()){
            return "failed";
        }else{
            return "success";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $finance = FinancialTransaction::find($id);
        if(!$finance->destroy($id)){
            return "failed";
        }else{
            return "success";
        }
    }
}
