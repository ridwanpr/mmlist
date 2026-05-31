<?php

namespace App\Http\Controllers\Backend;

use App\DTOs\ContactData;
use App\DTOs\PaginatedContactData;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function __construct() {}

    public function index()
    {
        $contacts = Contact::latest()->paginate(20)
            ->onEachSide(1)->withQueryString();

        $paginatedContacts = PaginatedContactData::fromPaginator(
            $contacts->through(fn(Contact $item): ContactData => ContactData::fromModel($item))
        );

        return Inertia::render("Backend/ContactMessage/Index", [
            'paginatedContacts' => $paginatedContacts
        ]);
    }
}
