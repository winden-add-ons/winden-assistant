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
        return $screens;
    }
}
