<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuotationRequest;
use App\Repositories\QuotationRepository;

class QuotationController extends Controller
{
    public function __construct(protected QuotationRepository $quotationRepository) {

    }
    public function getQuotation(QuotationRequest $request){
        
        return $this->quotationRepository->getQuotation($request->all());
    
    }
}
