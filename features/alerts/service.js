let dropdown = null;

export const registerDropdown = ref => (dropdown = ref);
export const alertWithType = (...args) => dropdown.alertWithType(...args);
