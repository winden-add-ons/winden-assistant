<?php

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