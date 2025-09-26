export function buildPath(
  template: string,
  params?: Record<string, string | number>
) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    if (val === undefined || val === null)
      throw new Error(`Missing path param: ${key}`);
    return encodeURIComponent(String(val));
  });
}
