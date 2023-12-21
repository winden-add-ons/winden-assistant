<?php

class TailwindConfigParser
{
    public static function parse($content)
    {
        // Default breakpoints
        $defaultScreens = [
            'sm' => '640px',
            'md' => '768px',
            'lg' => '1024px',
            'xl' => '1280px',
            '2xl' => '1536px',
        ];

        // Parsing pattern for direct screens
        $directPattern = '/theme:\s*\{\s*screens:\s*\{\s*(.*?)\s*\}\s*(,|})/s';
        $directScreens = self::parseScreens($content, $directPattern);

        // If direct screens are found, use them instead of default screens
        if (!empty($directScreens)) {
            return $directScreens;
        }

        // Parsing pattern for extended screens
        $extendPattern = '/extend:\s*\{\s*screens:\s*\{\s*(.*?)\s*\}\s*(,|})/s';
        $extendedScreens = self::parseScreens($content, $extendPattern);

        // Combine default screens with extended screens, if extended screens are provided
        return array_merge($defaultScreens, $extendedScreens);
    }

    private static function parseScreens($content, $pattern)
    {
        $screens = [];
        if (preg_match_all($pattern, $content, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
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
}
