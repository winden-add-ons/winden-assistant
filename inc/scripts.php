<?php

function winden_assistant_enqueue_script()
{
    // Check if the current user is an admin
    if (current_user_can('administrator')) {
        // Define the base URL for the plugin's scripts
        $plugin_base_url = plugin_dir_url(dirname(__FILE__));

        // Array of script names and their paths relative to the plugin base URL
        $scripts = array(
            'winden-assistant-script' => 'dist/assistant.min.js',
            'test' => 'test.js'
        );

        // Iterate over each script and enqueue it
        foreach ($scripts as $handle => $path) {
            wp_enqueue_script($handle, $plugin_base_url . $path, array(), '1.0', true);
        }
    }
}

add_action('wp_enqueue_scripts', 'winden_assistant_enqueue_script');
