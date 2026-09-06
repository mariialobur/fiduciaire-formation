(function () {
  const NativeMutationObserver = window.MutationObserver;
  if (!NativeMutationObserver || window.__FIDUCIAIRE_AUTONOMY_OBSERVER_GUARD__) return;

  function GuardedMutationObserver(callback) {
    const observer = new NativeMutationObserver(callback);
    const nativeObserve = observer.observe.bind(observer);
    observer.observe = function guardedObserve(target, options) {
      if (target && target.id === "app" && options && options.subtree === true) {
        return nativeObserve(target, Object.assign({}, options, { subtree: false }));
      }
      return nativeObserve(target, options);
    };
    return observer;
  }

  GuardedMutationObserver.prototype = NativeMutationObserver.prototype;
  window.MutationObserver = GuardedMutationObserver;
  window.__FIDUCIAIRE_AUTONOMY_OBSERVER_GUARD__ = true;
})();
