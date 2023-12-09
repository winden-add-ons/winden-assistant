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
        $assistant_script = plugin_dir_url(__FILE__) . 'dist/assistant.min.js';

        // Enqueue the script
        wp_enqueue_script('winden-assistant-script', $assistant_script, array(), '1.0', true);


        $script_path = plugin_dir_url(__FILE__) . 'test.js';

        // Enqueue the script
        wp_enqueue_script('test', $script_path, array(), '1.0', true);
    }
}

add_action('wp_enqueue_scripts', 'winden_assistant_enqueue_script');


// Hook to add content to the footer.
add_action('wp_footer', 'add_tailwind_screens_to_footer');

function add_tailwind_screens_to_footer()
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

    echo '<div id="tailwind-screens"><ul>';
    foreach ($screens as $name => $size) {
        echo "<li><button class='tailwind-screen-button' data-breakpoint='{$name}'>{$name}: {$size}</button></li>";
    }
    echo '</ul></div>';
}



function parse_tailwind_config($content)
{
    $screens = [];

    // Regular expression to match the screens object both directly and inside 'extend'.
    $pattern = '/screens:\s*\{\s*(.*?)\s*\}(,|})/s';

    // Match all instances of 'screens' object.
    if (preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
            // Match individual screen sizes within each 'screens' object.
            $screenPattern = '/(\w+):\s*"([^\"]+)"/';

            if (preg_match_all($screenPattern, $match[1], $screenMatches)) {
                foreach ($screenMatches[1] as $index => $name) {
                    $screens[$name] = $screenMatches[2][$index];
                }
            }
        }
    }

    return $screens;
}

