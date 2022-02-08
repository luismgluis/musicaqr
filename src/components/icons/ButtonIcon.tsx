/* leda */

type ButtonIconProps = {
  icon: JSX.Element;
};

export default function ButtonIcon({ icon }: ButtonIconProps) {
  console.log(icon);
  return <button>{icon}</button>;
}

/* leda */
