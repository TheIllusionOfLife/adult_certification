
try {
  // @ts-ignore
  const { GlobalRegistrator } = await import('@happy-dom/global-registrator');
  GlobalRegistrator.register();
} catch (e) {
  console.warn('GlobalRegistrator failed to load (environment missing dependencies?)', e);
}
