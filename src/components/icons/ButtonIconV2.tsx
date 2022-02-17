/* leda */

type ButtonIconProps = {
  icon: JSX.Element;
};

export default function ButtonIconV2({ icon }: ButtonIconProps) {
  console.log(icon);
  return <button className="buttonIconV2">{icon}</button>;
}

/* leda */
