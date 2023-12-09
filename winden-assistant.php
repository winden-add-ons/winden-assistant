<?php
/*
Plugin Name: Winden Assistant
Description: Load specific scripts for admin users on the front end.
Version: 1.0
Author: Your Name
*/


// Load all INC Files 

function load_dp_blocks_inc_files()
{
    $dirPath = __DIR__ . '/inc/';
    $files = scandir($dirPath);
    foreach ($files as $file) {
        $filePath = $dirPath . $file; // Removed the extra '/' since it's already in $dirPath
        if (is_file($filePath) && pathinfo($filePath, PATHINFO_EXTENSION) === 'php') {
            require_once($filePath);
        }
    }
}

add_action('init', 'load_dp_blocks_inc_files');




// get tw config from file
add_action('wp_footer', 'get_tw_config_from_file');

function get_tw_config_from_file()
{
    $configPath = plugin_dir_path(__FILE__) . 'data/tailwind.config.js';
    $configContent = file_get_contents($configPath);

    // Parse the Tailwind config file.
    // Note: You might need to write a custom parser or use an existing library, as this file is in JavaScript format.
    $screens = parse_tailwind_config($configContent);

    if (empty($screens)) {
        echo 'No screen values found or unable to parse the config file.';
        return;
    }

    $jsContent = '<script>';
    $jsContent .= 'var tailwindScreens = [];'; // Define a JavaScript array variable.

    foreach ($screens as $name => $size) {
        // Append the data to the JavaScript variable.
        $jsContent .= "tailwindScreens.push({ name: '{$name}', size: '{$size}' });";
    }

    $jsContent .= '</script>';

    // Output the JavaScript variable content.
    echo $jsContent;
}