import React, { FC } from "react";

interface SVGProps {
  width?: number;
  height?: number;
  color?: string;
}

export const TrashIcon: FC<SVGProps> = ({
  width = 60,
  height = 60,
  color = "#000",
}) => {
  return (
    <svg
      height={`${height}px`}
      width={`${width}px`}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      fill={color}
    >
      <path
        style={{ fill: "#FFC44F" }}
        d="M256.989,87.379H83.23c-4.498,0-8.145,3.647-8.145,8.145v121.631c0,4.498,3.647,8.145,8.145,8.145 h173.758c4.498,0,8.145-3.647,8.145-8.145V95.524C265.133,91.026,261.487,87.379,256.989,87.379z"
      />
      <path
        style={{ fill: "#F7B14D" }}
        d="M256.989,104.212H83.23c-4.498,0-8.145,3.647-8.145,8.145v15.895l89.858,59.905 c2.968,2.436,7.365,2.436,10.333,0l89.858-59.905v-15.895C265.133,107.859,261.487,104.212,256.989,104.212z"
      />
      <path
        style={{ fill: "#FFC44F" }}
        d="M256.989,87.379H83.23c-4.498,0-8.145,3.647-8.145,8.145v15.895l89.858,59.905 c2.968,2.436,7.365,2.436,10.333,0l89.858-59.905V95.524C265.133,91.026,261.487,87.379,256.989,87.379z"
      />
      <path
        style={{ fill: "#B3B9BF" }}
        d="M53.555,218.965l47.705,286.23c0.655,3.928,4.052,6.806,8.034,6.806h243.261 c3.982,0,7.379-2.878,8.034-6.806l47.705-286.23L53.555,218.965L53.555,218.965z"
      />
      <path
        style={{ fill: "#8E959F" }}
        d="M402.409,254.28l5.886-35.315H53.555l5.886,35.315l41.819,250.914 c0.655,3.928,4.052,6.806,8.034,6.806h71.432c-54.58-54.795-88.808-133.516-88.808-220.999c0-12.433,0.705-24.686,2.047-36.722 H402.409z"
      />
      <g>
        <path
          style={{ fill: "#68727E" }}
          d="M230.925,269.823c-11.677,0-21.177,9.5-21.177,21.177v147.694c0,11.677,9.5,21.177,21.177,21.177 s21.177-9.5,21.177-21.177V291C252.102,279.323,242.602,269.823,230.925,269.823z"
        />
        <path
          style={{ fill: "#68727E" }}
          d="M338.861,270.145c-11.379-2.007-22.532,5.811-24.536,17.174l-26.064,147.694 c-2.03,11.5,5.674,22.506,17.174,24.535c1.22,0.215,2.463,0.325,3.696,0.325c10.285,0,19.05-7.359,20.839-17.499l26.064-147.694 C358.064,283.181,350.36,272.175,338.861,270.145z"
        />
        <path
          style={{ fill: "#68727E" }}
          d="M147.524,287.319c-0.983-5.57-4.076-10.424-8.71-13.668c-4.635-3.245-10.254-4.492-15.826-3.506 c-11.5,2.03-19.204,13.035-17.174,24.535l26.064,147.694c1.789,10.14,10.554,17.499,20.839,17.499c1.234,0,2.477-0.11,3.696-0.325 c11.5-2.03,19.204-13.035,17.174-24.535L147.524,287.319z"
        />
      </g>
      <path
        style={{ fill: "#424F5E" }}
        d="M367.403,58.671c1.729-4.153-0.236-8.92-4.388-10.65L282.81,14.626 c-4.099-1.708-8.947,0.299-10.65,4.388l-12.533,30.104l15.083,6.154l9.358-22.478l65.166,27.133l-9.166,22.014l15.083,6.154 L367.403,58.671z"
      />
      <path
        style={{ fill: "#8E959F" }}
        d="M477.096,146.774c-4.366-10.594-12.595-18.854-23.173-23.259L165.187,3.295 c-21.837-9.091-46.998,1.277-56.089,23.113l-6.679,16.041c-1.707,4.099,0.298,8.946,4.388,10.65l352.901,146.935 c4.1,1.708,8.947-0.3,10.65-4.388l6.679-16.041C481.44,169.028,481.461,157.368,477.096,146.774z"
      />
      <g>
        <path
          style={{ fill: "#68727E" }}
          d="M102.418,42.448c-1.707,4.099,0.298,8.946,4.388,10.65l352.901,146.935 c4.1,1.708,8.947-0.3,10.65-4.388l6.679-16.041L109.096,26.408L102.418,42.448z"
        />
        <path
          style={{ fill: "#68727E" }}
          d="M422.059,182.946H39.791c-4.498,0-8.145,3.647-8.145,8.145v34.752c0,4.498,3.647,8.145,8.145,8.145 h382.268c4.498,0,8.145-3.647,8.145-8.145v-34.752C430.204,186.593,426.557,182.946,422.059,182.946z"
        />
      </g>
    </svg>
  );
};
