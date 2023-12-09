<?php
/*
Plugin Name: Winden Assistant
Description: Load specific scripts for admin users on the front end.
Version: 1.0
Author: Your Name
*/

function winden_assistant_enqueue_script()
{
    // Check if the current user is an admin
    if (current_user_can('administrator')) {
        // Define the path to the script
        $script_path = plugin_dir_url(__FILE__) . 'dist/assistant.min.js';

        // Enqueue the script
        wp_enqueue_script('winden-assistant-script', $script_path, array(), '1.0', true);
    }
}

add_action('wp_enqueue_scripts', 'winden_assistant_enqueue_script');
