import * as icons from "./index";

const Icon = ({ name }) => {
  if (!icons[name]) {
    console.info(`SvgIcon "${name}" not found`);
  }

  return icons[name]() ?? null;
};

export default Icon;
