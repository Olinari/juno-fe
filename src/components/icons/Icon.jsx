import * as icons from "./index";

const Icon = ({ name = "", ...props }) => {
  if (!icons[name]) {
    console.warn(`SvgIcon "${name}" not found`);
  }

  const IconComponent = icons[name];

  return <IconComponent {...props} />;
};

export default Icon;
