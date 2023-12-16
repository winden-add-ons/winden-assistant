<?php

require_once 'TailwindConfigParser.php';

class TailwindConfigLoader
{
    public function getTwConfigFromFile()
    {
        $configPath = plugin_dir_path(__FILE__) . '../data/tailwind.config.js';

        // Check if the file exists
        if (file_exists($configPath)) {
            $configContent = file_get_contents($configPath);
        } else {
            // File does not exist, load content from database
            $option_name = 'winden_editor';
            $option_value = get_option($option_name);

            if (is_array($option_value) && count($option_value) > 0) {
                $configContent = isset($option_value[1]['content']) ? $option_value[1]['content'] : 'No content available';
            } else {
                echo 'No config content available in the database.';
                return;
            }
        }

        // Continue processing the config content
        $screens = TailwindConfigParser::parse($configContent);

        if (empty($screens)) {
            echo 'No screen values found or unable to parse the config file.';
            return;
        }

        $jsContent = '<script>';
        $jsContent .= 'var tailwindScreens = [];';

        foreach ($screens as $name => $size) {
            $jsContent .= "tailwindScreens.push({ name: '{$name}', size: '{$size}' });";
        }

        $jsContent .= '</script>';
        echo $jsContent;
    }
}
