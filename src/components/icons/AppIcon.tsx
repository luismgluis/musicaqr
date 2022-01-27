type AppIconProps = {
  width?: number;
  color?: string;
  height?: number | null;
  withShadow?: boolean;
};
const AppIcon: React.FC<AppIconProps> = ({
  width = 50,
  height = null,
  color = "#d5d5d5",
  withShadow = false,
}) => {
  if (height === null) height = width;

  return (
    <div className="AppIcon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 661.31 661.31"
        width={width}
        height={height}
      >
        <defs>
          <style>
            {
              ".cls-2{fill:none}.cls-11,.cls-12,.cls-15,.cls-20{fill-rule:evenodd}.cls-11{fill:#eae6f2}.cls-12{fill:#d9d0e8}.cls-15{fill:#9776c0}.cls-20{fill:#9e82c7}.cls-22{mix-blend-mode:multiply;opacity:.48}.cls-23{fill:#cfaee3}.cls-29{fill:#d1bfe8}"
            }
          </style>
          <pattern
            id="Unnamed_Pattern"
            data-name="Unnamed Pattern"
            width={186.93}
            height={61.55}
            patternTransform="matrix(1 0 0 -1 154.19 16902.63)"
            patternUnits="userSpaceOnUse"
            viewBox="0 0 186.94 61.55"
          >
            <path className="cls-2" d="M0 0H186.93V61.55H0z" />
          </pattern>
          <clipPath id="clip-path">
            <path className="cls-2" d="M0 0H186.94V61.55H0z" />
          </clipPath>
          <clipPath id="clip-path-2">
            <path className="cls-2" d="M0 0H186.94V61.55H0z" />
          </clipPath>
          <clipPath id="clip-path-3">
            <path
              d="M330.66 14.83c174.42 0 315.82 141.4 315.82 315.83s-141.4 315.82-315.82 315.82S14.83 505.08 14.83 330.66 156.23 14.83 330.66 14.83"
              clipRule="evenodd"
              fill="none"
            />
          </clipPath>
          <mask
            id="mask"
            x={0}
            y={61.55}
            width={342.13}
            height={457.38}
            maskUnits="userSpaceOnUse"
          >
            <path
              fill="url(#Unnamed_Pattern)"
              d="M155.19 457.38H342.12V518.93H155.19z"
            />
          </mask>
          <mask
            id="mask-2"
            x={0}
            y={61.55}
            width={514.86}
            height={457.39}
            maskUnits="userSpaceOnUse"
          >
            <path
              fill="url(#Unnamed_Pattern_2)"
              d="M327.92 457.39H514.86V518.9399999999999H327.92z"
            />
          </mask>
        </defs>
        <g
          style={{
            isolation: "isolate",
          }}
        >
          <g id="Capa_2" data-name="Capa 2">
            <g id="Capa_1-2" data-name="Capa 1">
              <path
                d="M330.66 8c178.2 0 322.66 144.46 322.66 322.67S508.86 653.32 330.66 653.32 8 508.86 8 330.66 152.45 8 330.66 8"
                fillRule="evenodd"
                fill="#fff"
              />
              <g clipPath="url(#clip-path-3)">
                <path
                  d="M331.83 603.11c162.23 9.89 295.55-39.34 297.78-109.87S502.15 357.56 339.92 347.71 44.37 387.06 42.14 457.58 169.6 593.27 331.83 603.11"
                  fill="#f9f5ff"
                  fillRule="evenodd"
                />
                <path
                  className="cls-11"
                  d="M440.82 384.28L419.49 376.47 552.03 144.36 565.71 144.43 440.82 384.28z"
                />
                <path
                  className="cls-12"
                  d="M419.49 376.47L404.97 371.16 543.63 139.56 552.03 144.36 419.49 376.47z"
                />
                <path
                  className="cls-11"
                  d="M215.55 383.25L237.66 378.02 133.41 131.9 119.82 130.35 215.55 383.25z"
                />
                <path
                  className="cls-12"
                  d="M237.66 378.02L252.71 374.45 142.31 128.12 133.41 131.9 237.66 378.02z"
                />
                <path
                  fill="#ccbddf"
                  fillRule="evenodd"
                  d="M160.57 462.22L167.47 454.63 332.44 482.85 332.44 482.86 497.4 454.63 504.3 462.23 332.44 495.17 332.44 495.16 160.57 462.22z"
                />
                <path
                  fill="#369"
                  fillRule="evenodd"
                  d="M514.1 423.25L332.44 442.88 150.77 423.25 153.92 437 332.44 457.53 510.95 437 514.1 423.25z"
                />
                <path
                  className="cls-12"
                  d="M332.44 407.71L196.59 415.42 263.57 364.23 243.87 365.71 151.29 423.31 332.44 442.88 513.57 423.3 421 366.87 402.2 365.15 468.28 415.42 332.44 407.71z"
                />
                <path
                  className="cls-15"
                  d="M452.66 426.45a3.3 3.3 0 01-3.28-2.18c-.42-1.52.72-3 2.54-3.37a3.81 3.81 0 01.75-.07A3.3 3.3 0 01456 423c.41 1.51-.72 3-2.54 3.36a3.81 3.81 0 01-.75.07"
                />
                <path
                  fill="#d5cae5"
                  fillRule="evenodd"
                  d="M196.59 415.42L332.44 407.71 332.44 359.05 263.57 364.23 196.59 415.42z"
                />
                <path
                  fill="#f1ebfa"
                  fillRule="evenodd"
                  d="M468.51 415.18L332.67 407.48 332.67 358.81 401.53 363.99 468.51 415.18z"
                />
                <path
                  fill="#c5b6db"
                  fillRule="evenodd"
                  d="M196.59 415.42L332.44 415.28 463.64 415.15 332.44 407.71 196.59 415.42z"
                />
                <path
                  className="cls-15"
                  d="M167.47 454.63L163.09 438.05 153.93 437 159.71 462.22 163.74 458.73 167.47 454.63z"
                />
                <path
                  fill="#a28cbd"
                  fillRule="evenodd"
                  d="M497.4 454.63L501.79 438.05 510.95 437 505.16 462.22 501.13 458.73 497.4 454.63z"
                />
                <path
                  className="cls-20"
                  d="M332.44 457.53L163.09 438.05 167.83 454.69 332.44 482.86 332.44 457.53z"
                />
                <path
                  className="cls-20"
                  d="M501.79 438.05L332.44 457.53 332.44 482.86 497.4 454.63 501.85 438.05 501.79 438.05z"
                />
                <g className="cls-22" mask="url(#mask)">
                  <path
                    className="cls-23"
                    d="M155.19 457.38H342.12V518.93H155.19z"
                  />
                </g>
                <path
                  fill="#b9a5d2"
                  fillRule="evenodd"
                  d="M332.44 495.16L160.57 462.22 159.71 462.22 162.32 473.62 332.44 509.56 332.44 495.16z"
                />
                <g className="cls-22" mask="url(#mask-2)">
                  <path
                    className="cls-23"
                    d="M327.92 457.39H514.86V518.9399999999999H327.92z"
                  />
                </g>
                <path
                  fill="#ccb5eb"
                  fillRule="evenodd"
                  d="M332.44 495.16L504.3 462.22 505.16 462.22 502.55 473.62 332.43 509.56 332.44 495.16z"
                />
                <path
                  fill="#bfaed7"
                  fillRule="evenodd"
                  d="M332.44 449.06L332.44 442.88 151.29 423.31 151.27 423.32 150.77 423.25 153.93 437 163.09 438.05 332.44 457.53 332.44 449.07 332.44 449.06z"
                />
                <path
                  d="M501.79 438.05zm-169.35 4.83v14.64l169.35-19.48h.06L511 437l3.15-13.76-.51.08z"
                  fill="#e5ddf0"
                  fillRule="evenodd"
                />
                <path
                  className="cls-15"
                  d="M442.18 427.57a3.29 3.29 0 01-3.28-2.18 2.83 2.83 0 012.53-3.37 5 5 0 01.75-.07 3.28 3.28 0 013.28 2.19c.42 1.51-.72 3-2.53 3.36a3.88 3.88 0 01-.75.07M431.69 429.07a3.28 3.28 0 01-3.27-2.18c-.42-1.52.71-3 2.53-3.37a3.81 3.81 0 01.75-.07 3.29 3.29 0 013.28 2.19 2.84 2.84 0 01-2.53 3.36 4 4 0 01-.76.07M420.46 430.19a3.3 3.3 0 01-3.28-2.18c-.42-1.52.72-3 2.54-3.37a4.76 4.76 0 01.75-.07 3.29 3.29 0 013.28 2.19c.41 1.51-.72 3-2.54 3.37a4.74 4.74 0 01-.75.06"
                />
                <path
                  className="cls-29"
                  d="M269.16 204.76l-9.5-25.17c23.1-15.44 48-23 73.9-22.47 25.62.51 49.83 8.86 71.95 24.81l-10.45 24.82C376 193 355.11 185.8 333 185.35c-22.41-.45-43.89 6.09-63.83 19.41"
                />
                <path
                  className="cls-29"
                  d="M285.83 243.39l-9.5-25.18c17.43-11.62 36.91-17.56 56.34-17.17s38.32 7 54.85 19L377 244.79c-27.08-19.7-62.63-20.46-91.18-1.4"
                />
                <path
                  className="cls-29"
                  d="M304.45 281.4l-9.75-25a62.66 62.66 0 0173.1 1.1l-10.52 24.78a45.4 45.4 0 00-52.83-.87"
                />
              </g>
              <path
                d="M660.31 330.66C660.31 148.59 512.72 1 330.66 1S1 148.59 1 330.66s147.59 329.65 329.66 329.65 329.65-147.59 329.65-329.65M330.66 646.48c-174.43 0-315.83-141.4-315.83-315.82S156.23 14.83 330.66 14.83s315.82 141.4 315.82 315.83-141.4 315.82-315.82 315.82z"
                fill="#e7e7f2"
                fillRule="evenodd"
              />
              <path className="cls-2" d="M0 0H661.31V661.31H0z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default AppIcon;
