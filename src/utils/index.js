const getButtonVariant = (visibilityType, currentVisibilityType) => {
  return visibilityType === currentVisibilityType ? "dark" : "outline-dark";
};

export { getButtonVariant };
