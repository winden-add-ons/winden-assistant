<?php

class TailwindConfigParser
{
    public static function parse($files)
    {
        // Default breakpoints
        $defaultScreens = [
            'sm' => '640px',
            'md' => '768px',
            'lg' => '1024px',
            'xl' => '1280px',
            '2xl' => '1536px',
        ];

        // Find the tailwind.config.js file
        $tailwindConfigContent = self::findTailwindConfig($files);

        // If tailwind.config.js is found, parse its screens
        if ($tailwindConfigContent !== null) {
            $customScreens = self::parseTailwindConfig($tailwindConfigContent);
            return array_merge($defaultScreens, $customScreens);
        }

        // Return default screens if tailwind.config.js is not found
        return $defaultScreens;
    }

    private static function findTailwindConfig($files)
    {
        foreach ($files as $file) {
            if ($file['name'] === 'tailwind.config.js') {
                return $file['content'];
            }
        }
        return null;
    }

    private static function parseTailwindConfig($content)
    {
        // Convert JS object to JSON
        $jsonContent = str_replace(['export default {', '}'], ['{', '}'], $content);
        $configArray = json_decode($jsonContent, true);

        if ($configArray === null) {
            // Handle JSON parsing error
            return []; // or throw an exception
        }

        return $configArray['theme']['screens'] ?? [];
    }
}
