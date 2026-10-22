(() => {
    const carousel = document.querySelector('[data-team-carousel]');
    if (!carousel) return;
    const viewport = carousel.querySelector('[data-team-viewport]');
    const track = carousel.querySelector('[data-team-track]');
    const cards = [...track.querySelectorAll('[data-team-member]')];
    if (cards.length < 2) return;
    const toggle = carousel.querySelector('[data-team-toggle]');
    const status = carousel.querySelector('[data-team-status]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches;
    let hovered = false;
    let focused = false;
    let visible = false;
    let loopWidth = 0;
    let step = 0;
    let offset = 0;
    let frame = null;
    let lastTime = 0;
    let travel = null;
    const speed = 18; // Pixels per second, independent of display refresh rate.

    const clone = card => {
        const copy = card.cloneNode(true);
        copy.removeAttribute('data-team-member');
        copy.setAttribute('aria-hidden', 'true');
        copy.setAttribute('inert', '');
        return copy;
    };
    const prefix = cards.map(clone);
    track.prepend(...prefix);
    track.append(...cards.map(clone));

    function render() {
        if (!loopWidth) return;
        while (offset < loopWidth) offset += loopWidth;
        while (offset >= loopWidth * 2) offset -= loopWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }
    function measure() {
        const progress = loopWidth ? (offset - loopWidth) / loopWidth : 0;
        loopWidth = cards[0].offsetLeft - prefix[0].offsetLeft;
        step = cards[1].offsetLeft - cards[0].offsetLeft;
        offset = loopWidth * (1 + progress);
        travel = null;
        render();
    }
    function autoplay() {
        return !paused && !hovered && !focused && visible && !document.hidden;
    }
    function start() {
        if (frame !== null || (!autoplay() && !travel)) return;
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
    }
    function tick(now) {
        frame = null;
        const elapsed = Math.min((now - lastTime) / 1000, .05);
        lastTime = now;
        if (travel) {
            const progress = Math.min((now - travel.started) / 550, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            offset = travel.from + (travel.to - travel.from) * eased;
            if (progress === 1) {
                travel = null;
                const index = ((Math.round((offset - loopWidth) / step) % cards.length) + cards.length) % cards.length;
                status.textContent = `Showing employee profile ${index + 1} of ${cards.length}.`;
            }
        } else if (autoplay()) {
            offset += speed * elapsed;
        }
        render();
        if (autoplay() || travel) frame = requestAnimationFrame(tick);
    }
    function move(direction) {
        if (reduced.matches) {
            offset += direction * step;
            render();
            const index = ((Math.round((offset - loopWidth) / step) % cards.length) + cards.length) % cards.length;
            status.textContent = `Showing employee profile ${index + 1} of ${cards.length}.`;
        } else {
            travel = {from: offset, to: offset + direction * step, started: performance.now()};
            start();
        }
    }
    function updateToggle() {
        toggle.textContent = paused ? '( Play )' : '( Pause )';
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.setAttribute('aria-label', paused ? 'Play employee slider' : 'Pause employee slider');
    }
    carousel.querySelector('[data-team-prev]').addEventListener('click', () => move(-1));
    carousel.querySelector('[data-team-next]').addEventListener('click', () => move(1));
    toggle.addEventListener('click', () => {
        paused = !paused;
        updateToggle();
        start();
    });
    viewport.addEventListener('mouseenter', () => { hovered = true; });
    viewport.addEventListener('mouseleave', () => { hovered = false; start(); });
    carousel.addEventListener('focusin', () => { focused = true; });
    carousel.addEventListener('focusout', event => {
        focused = carousel.contains(event.relatedTarget);
        start();
    });
    document.addEventListener('visibilitychange', start);
    reduced.addEventListener('change', () => {
        paused = reduced.matches;
        travel = null;
        updateToggle();
        start();
    });
    new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        start();
    }).observe(viewport);
    new ResizeObserver(() => { measure(); start(); }).observe(viewport);
    measure();
    updateToggle();
})();
