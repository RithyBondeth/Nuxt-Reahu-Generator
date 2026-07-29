/**
 * `v-reveal` — fades an element up the first time it scrolls into view.
 *
 * The start state lives in the `.reveal` class applied in the template, so
 * prerendered markup already carries it and there is no flash of finished
 * content before hydration. The directive only attaches the observer, and
 * disconnects after firing once: a reveal that replays on every scroll reads as
 * a gimmick rather than an arrival.
 *
 * `getSSRProps` is what makes the directive legal during prerendering; without
 * it Vue throws when it meets a custom directive on the server.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),

    mounted(el: HTMLElement, binding) {
      // Staggering is expressed at the call site as `v-reveal="120"` (ms).
      if (typeof binding.value === 'number') {
        el.style.transitionDelay = `${binding.value}ms`
      }

      const show = () => el.classList.add('is-visible')

      // Without observer support, or when the reader has asked for less motion,
      // skip straight to the finished state.
      if (
        !('IntersectionObserver' in window)
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        show()
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          show()
          observer.disconnect()
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )

      observer.observe(el)

      // Vue calls this on unmount; stop observing detached nodes.
      ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
    },

    unmounted(el: HTMLElement & { _revealObserver?: IntersectionObserver }) {
      el._revealObserver?.disconnect()
    }
  })
})
