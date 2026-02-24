
try {
  const { GlobalRegistrator } = await import('@happy-dom/global-registrator');
  GlobalRegistrator.register();
} catch (e) {
  // Ignore if happy-dom is not available
  console.warn('happy-dom not available, skipping registration', e);
}
