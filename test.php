<?php

function print_winden_editor_config()
{
    // Only run this on the front end
    if (is_admin()) {
        return;
    }

    // The option name you want to print
    $option_name = 'winden_editor';

    // Get the option value
    $option_value = get_option($option_name);

    // Check if the option is an array and has at least one element
    if (is_array($option_value) && count($option_value) > 0) {
        // Get the content of the first element
        $first_element_content = isset($option_value[1]['content']) ? $option_value[1]['content'] : 'No content available';

        // Print the content of the first element
        echo '<pre><strong>Content of the first element in ' . $option_name . ':</strong> ' . esc_html($first_element_content) . '</pre>';
    } else {
        echo '<pre>No data found for ' . $option_name . '</pre>';
    }
}

// You can hook this function to a front-end specific action, like 'wp_footer' or 'wp_head'.
add_action('wp_footer', 'print_winden_editor_config');