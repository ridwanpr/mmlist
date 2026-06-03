<!DOCTYPE html>
<html theme="dark" lang="en">

<head>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        document.addEventListener("zarazConsentAPIReady", () => {
            const noConsentPages = ['/privacy-policy', '/terms', '/about'];
            function manageModalVisibility() {
                if (noConsentPages.includes(window.location.pathname)) {
                    setTimeout(() => {
                        if (typeof zaraz !== 'undefined' && zaraz.consent?.modal) {
                            zaraz.consent.modal.hide();
                        }
                    }, 50);
                }
            }
            manageModalVisibility();
            document.addEventListener("inertia:success", manageModalVisibility);
        });
    </script>
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
