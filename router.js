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
        const hash = window.location.hash.slice(1) || '/';
        this.currentPath = hash;

        const handler = this.routes[hash];
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
