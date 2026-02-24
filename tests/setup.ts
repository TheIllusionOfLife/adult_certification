
try {
  const { GlobalRegistrator } = await import('@happy-dom/global-registrator');
  GlobalRegistrator.register();
} catch (e) {
  // Only suppress if the module is missing
  if ((e as { code?: string }).code === 'ERR_MODULE_NOT_FOUND') {
    console.warn('happy-dom not available, skipping registration');
  } else {
    // Rethrow other errors (e.g. syntax error in module, permission denied)
    throw e;
  }
}
