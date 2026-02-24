try {
  const { GlobalRegistrator } = await import('@happy-dom/global-registrator');
  GlobalRegistrator.register();
} catch (e) {
  const err = e as { code?: string; message?: string };
  const missingModule =
    err?.code === 'ERR_MODULE_NOT_FOUND' ||
    err?.code === 'MODULE_NOT_FOUND' ||
    err?.message?.includes('Cannot find package') === true ||
    err?.message?.includes('Cannot find module') === true;

  if (!missingModule) {
    throw e;
  }

  // Ignore if happy-dom is not available in this environment.
  console.warn('happy-dom not available, skipping registration');
}
