export const formatModules = (modules) => {
  if (!modules || modules.length === 0) return "";

  return modules
    .sort((a, b) => a - b)
    .map((m) => `Module ${m}`)
    .join(" • ");
};
