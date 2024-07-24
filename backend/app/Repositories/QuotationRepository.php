<?php

namespace App\Repositories;

use App\Interfaces\Interfaces\QuotationInterface;
use Carbon\Carbon;

class QuotationRepository implements QuotationInterface
{
    protected $fixed_rate = 3;

    function getQuotation(array $data)
    {

        //return $this->fixed_rate * $this->getAgeLoad($data['age']) * $this->getTripLength($data['start_date'],$data['end_date']);
    return response()->json([
        'total'=> $this->getTotalQuotation($data['age'],$data['start_date'],$data['end_date']),
        'currency_id' => $data['currency_id'],
        'quotation_id' => rand(0,999)
    ],200);
    }

    function getTotalQuotation($age,$start_date,$end_date) {

        $total = 0;
        foreach ($age as $key => $ageItem) {
       
            $total +=  $this->fixed_rate * $this->getAgeLoad($ageItem['item_id']) * $this->getTripLength($start_date,$end_date);
       
        }

        return round($total,2);
    }

    function getTripLength($start_date,$end_date) {

        $startDate = Carbon::parse($start_date);
        $endDate = Carbon::parse($end_date);
        return $startDate->diffInDays($endDate->addDay());

    }

    function getAgeLoad($age) {
        
        switch ($age) {
            case ($age >= 18 && $age <= 30):
               return 0.6;
            case ($age >= 31 && $age <= 40):
                return 0.7; 
            case ($age >= 41 && $age <= 50):
                return 0.8; 
            case ($age >= 51 && $age <= 60):
                return 0.9; 
            case ($age >= 61 && $age <= 70):
                return 1; 
        }

    }
}
