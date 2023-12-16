<?php

require_once 'TailwindConfigParser.php';

class TailwindConfigLoader
{
    public function getTwConfigFromFile()
    {
        $configPath = plugin_dir_path(__FILE__) . '../data/tailwind.config.js';
        $configContent = file_get_contents($configPath);
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
