<?php

namespace App\Http\Requests;

use App\Http\Requests\JsonFormRequest;

class QuotationRequest extends JsonFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'age' => 'required|array',
            'currency_id' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|after:start_date',
        ];
    }

    public function messages()
{
    return [
        'age.required' => 'The ages field is required',
        'currency_id.required' => 'The currency field is required',
    ];
}
}
