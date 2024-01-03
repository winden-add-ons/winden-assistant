<?php

class WindenAutocompleteLoad
{
    public function suggestions()
    {
        $suggestionsPrefix = []; // Initialize an empty array for suggestionsPrefix

        if (class_exists('Winden\Repositories\TaskRepository')) {
            $taskRepository = \Winden\Repositories\TaskRepository::latest();
            if ($taskRepository && $taskRepository->cache) {
                $autocompleteData = $taskRepository->cache->getContent('autocomplete.json');
                $suggestionsPrefix = json_decode($autocompleteData, true); // Decode to array
            }
        }

        echo '<script type="text/javascript">';
        echo 'var suggestions = ' . json_encode($suggestionsPrefix) . ';';
        echo '</script>';
    }
}