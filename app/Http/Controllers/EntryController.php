<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entry;
use App\User;
use League\Csv\Reader;

class EntryController extends Controller
{

    public function index () {
        return Entry::where('user_id', 1)->get();
    }
    
    /**
     * Handles new entries that are uploaded individually or
     * as a CSV file.
     */
    public function store (Request $request) {
        // is there a file attached to the request?
        if ($request->hasFile('file')) {
            // make sure it is a CSV
            $request->validate([
                'file' => 'required', 
                'extension' => 'mimes:csv'
            ]);
            // get the user
            $user = User::find($request->input('user_id'));
            // create a CSV reader
            $reader = Reader::createFromFileObject($request->file('file')->openFile());
            $reader->setHeaderOffset(0);
            $headers = array_map('strtolower', $reader->getHeader());
            $records = $reader->getRecords($headers);
            // create the entries
            $entries = [];
            foreach ($records as $e) {
                try {
                    $entries[] = $user->entries()->create($e);
                } catch (\Exception $e) {
                    // fail silently on dupes
                }
            }
            return response()->json($entries, 201);
        } else {
            // create individual entry
            $entry = Entry::create($request->all());
            return response()->json($entry, 201);
        }
    }
    
    public function update (Request $request, Entry $entry) {
        $entry->update($request->all());
        return response()->json($entry, 200);
    }
    
    public function delete (Entry $entry) {
        $entry->delete();
        return response()->json(null, 204);
    }
}
