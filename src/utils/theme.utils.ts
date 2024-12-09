let isDark = true;

const Light = {
  primaryDarkColor: "#10213F",
  primaryLightColor: "#586479",
  primaryDarkText: "#0B162B",
  primaryLightText: "#8E8E93",
  secondaryDarkColor: "#E73F3F",
  secondaryLightColor: "#FFF4EF",
  secondaryDarkText: "#F16722",
  secondaryLightText: "#8E8E93",
  background: "#F8F9FB",
  secondaryBackground: "#F0F5FF",
  inputBackground: "#F2F4F7",
  buttonTextColor: "#FFFFFF",
  outline: "#F1F1F4",
  focusOutLine: "#C9C9C9",
  otpOutLine: "#EBEBEB",
  cancel: "#E73F3F",
};

const Dark = {
  primaryDarkColor: "#10213F",
  primaryLightColor: "#586479",
  primaryDarkText: "#0B162B",
  primaryLightText: "#8E8E93",
  secondaryDarkColor: "#F16722",
  secondaryLightColor: "#FFF4EF",
  secondaryDarkText: "#F16722",
  secondaryLightText: "#8E8E93",
  background: "#F8F9FB",
  secondaryBackground: "#F0F5FF",
  inputBackground: "#F2F4F7",
  buttonTextColor: "#FFFFFF",
  outline: "#F1F1F4",
  focusOutLine: "#CFCFCF",
  otpOutLine: "#EBEBEB",
  cancel: "#E73F3F",
};

export default isDark ? Dark : Light;
