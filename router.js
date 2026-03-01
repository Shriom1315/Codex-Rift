/* =====================================================
   CODEX HUNT — Simple Hash-based Router
   ===================================================== */

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentPath = '/';
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    navigate(path) {
        window.location.hash = path;
    }

    handleRoute() {
        // Fallback: If someone visits /admin directly without the #
        let path = window.location.hash.slice(1);
        if (!path) {
            const pathname = window.location.pathname;
            path = pathname !== '/' ? pathname : '/';
        }

        this.currentPath = path;

        const handler = this.routes[path];
        if (handler) {
            // Scroll to top
            window.scrollTo(0, 0);
            handler();
        } else {
            // 404 — go home
            this.navigate('/');
        }
    }
}
