export const getRepairGuide = async (device: string, issue: string) => {
  // ▼▼▼ REALNI SAVETI ZA POPRAVKU ▼▼▼
  return {
    device,
    issue,
    solution: `1. Proverite kablove
2. Restartujte uređaj`
  };
};