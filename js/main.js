const modules = document.body.dataset.module?.split(/\s+/) || [];

for (const mod of modules) {
    switch (mod) {
        case "modal":
            import('./modal.js').then(m => m.init && m.init());
            break;
        case "newsletter":
            import('./newsletter.js').then(m => m.init && m.init());
            break;
        case "scroll-reveal":
            import('./scroll-reveal.js').then(m => m.init && m.init());
            break;
        case "smooth-scroll":
            import('./smooth-scroll.js').then(m => m.init && m.init());
            break;
        case "contact-form":
            import('./contact-form.js').then(m => m.init && m.init());
            break;
        case "nav":
            import('./nav.js').then(m => m.init && m.init());
            break;
        
        default:
            break;
    }
}