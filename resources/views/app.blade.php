<!DOCTYPE html>
<html theme="dark">

<head>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@200..800&display=swap"
        rel="stylesheet">
    <script>
        (function() {
            try {
                const saved = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('theme='))
                    ?.split('=')[1];

                const systemDark = window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches;

                const theme = saved === 'dark' || saved === 'light' ?
                    saved :
                    systemDark ? 'dark' : 'light';

                document.documentElement.classList.toggle('dark', theme === 'dark');
                document.documentElement.dataset.theme = theme;
            } catch (e) {}
        })();
    </script>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    <x-inertia::head>
        <title>{{ config('app.name') }}</title>
        <meta name="description"
            content="Find anime trigger warnings and community-rated content flags on Mamorulist. Search your favorite series and safely manage your anime watchlist.">
    </x-inertia::head>
</head>

<body>
    <x-inertia::app />
</body>

</html>
