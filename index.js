if (!("IntersectionObserver" in window)) {
  class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.observedElements = [];
      this.checkIntersections = this.checkIntersections.bind(this);
    }
    observe(target) {
      this.observedElements = [...this.observedElements, target];
      this.startCheckingIntersections();
    }
    unobserve(target) {
      this.observedElements = this.observedElements.filter(
        (element) => element !== target
      );
    }
    startCheckingIntersections() {
      if (!this.intervalId) {
        this.intervalId = setInterval(this.checkIntersections, 100);
      }
    }
    stopCheckingIntersections() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
    checkIntersections() {
      this.observedElements.forEach((element) => {
        let isIntersecting = false;
        const elementRect = element.getBoundingClientRect();
        if (
          elementRect.top >= 0 &&
          elementRect.left >= 0 &&
          elementRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          elementRect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        ) {
          isIntersecting = true;
        }
        this.callback([
          {
            target: element,
            isIntersecting,
          },
        ]);
      });
    }
  }
  window.IntersectionObserver = IntersectionObserver;
}