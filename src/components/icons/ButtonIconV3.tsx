/* leda */

type ButtonIconProps = {
  icon: JSX.Element;
};

export default function ButtonIconV3({ icon }: ButtonIconProps) {
  console.log(icon);
  return <button className="buttonIconV3">{icon}</button>;
}

/* leda */
