<?php

class TailwindConfigParser
{
    public static function parse($content)
    {
        $screens = [];
        $pattern = '/screens:\s*\{\s*(.*?)\s*\}(,|})/s';

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

        // Check if no breakpoints are found and add default breakpoints
        if (empty($screens)) {
            $screens = [
                'sm' => '640px',
                'md' => '768px',
                'lg' => '1024px',
                'xl' => '1280px',
                '2xl' => '1536px',
            ];
        }

        return $screens;
    }
}
