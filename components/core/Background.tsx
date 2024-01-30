"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const css = `
svg-background {
    content: "";
    width: var(--max-screen-width);
    height: 2160px;
    background-position: top;
  }

  .svg-background {
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%224933%22%20height%3D%223213%22%20viewBox%3D%220%200%204933%203213%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M85.5887%201392.79C85.5887%201392.79%20246.617%201839.17%20892.959%201914C1539.3%201988.83%201494.17%201179.36%202379.93%201198.2C3265.7%201217.03%204798.68%201953.28%204798.68%201953.28%22%20stroke%3D%22url(%23paint0_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M122.616%201291.51C122.616%201291.51%20283.644%201737.89%20929.986%201812.72C1576.33%201887.55%201531.19%201078.08%202416.96%201096.91C3302.72%201115.75%204835.71%201851.99%204835.71%201851.99%22%20stroke%3D%22url(%23paint1_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M164.277%201177.57C164.277%201177.57%20325.305%201623.95%20971.648%201698.78C1617.99%201773.61%201572.86%20964.142%202458.62%20982.975C3344.38%201001.81%204877.37%201738.05%204877.37%201738.05%22%20stroke%3D%22url(%23paint2_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M203.612%201069.96C203.612%201069.96%20364.64%201516.34%201010.98%201591.16C1657.32%201665.99%201612.19%20856.528%202497.95%20875.361C3383.72%20894.194%204916.7%201630.44%204916.7%201630.44%22%20stroke%3D%22url(%23paint3_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M85.5887%201392.79C85.5887%201392.79%20246.617%201839.17%20892.959%201914C1539.3%201988.83%201494.17%201179.36%202379.93%201198.2C3265.7%201217.03%204798.68%201953.28%204798.68%201953.28%22%20stroke%3D%22url(%23paint4_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M122.616%201291.51C122.616%201291.51%20283.644%201737.89%20929.986%201812.72C1576.33%201887.55%201531.19%201078.08%202416.96%201096.91C3302.72%201115.75%204835.71%201851.99%204835.71%201851.99%22%20stroke%3D%22url(%23paint5_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M164.277%201177.57C164.277%201177.57%20325.305%201623.95%20971.648%201698.78C1617.99%201773.61%201572.86%20964.142%202458.62%20982.975C3344.38%201001.81%204877.37%201738.05%204877.37%201738.05%22%20stroke%3D%22url(%23paint6_linear_2_445)%22%2F%3E%0A%3Cpath%20d%3D%22M203.612%201069.96C203.612%201069.96%20364.641%201516.34%201010.98%201591.16C1657.32%201665.99%201612.19%20856.528%202497.96%20875.361C3383.72%20894.194%204916.7%201630.44%204916.7%201630.44%22%20stroke%3D%22url(%23paint7_linear_2_445)%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2_445%22%20x1%3D%222169.1%22%20y1%3D%222419.89%22%20x2%3D%223743.87%22%20y2%3D%221940.92%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint1_linear_2_445%22%20x1%3D%222206.12%22%20y1%3D%222318.61%22%20x2%3D%222682.87%22%20y2%3D%221014.54%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint2_linear_2_445%22%20x1%3D%221280.55%22%20y1%3D%221743.42%22%20x2%3D%223997.91%22%20y2%3D%222208.88%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint3_linear_2_445%22%20x1%3D%222287.12%22%20y1%3D%222097.05%22%20x2%3D%222763.87%22%20y2%3D%22792.982%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint4_linear_2_445%22%20x1%3D%222169.1%22%20y1%3D%222419.89%22%20x2%3D%223743.87%22%20y2%3D%221940.92%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint5_linear_2_445%22%20x1%3D%222206.12%22%20y1%3D%222318.61%22%20x2%3D%222682.87%22%20y2%3D%221014.54%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint6_linear_2_445%22%20x1%3D%221280.55%22%20y1%3D%221743.42%22%20x2%3D%223997.91%22%20y2%3D%222208.88%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22paint7_linear_2_445%22%20x1%3D%222287.12%22%20y1%3D%222097.06%22%20x2%3D%222763.87%22%20y2%3D%22792.982%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20stop-color%3D%22%231DB954%22%20stop-opacity%3D%220.37%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-opacity%3D%220%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A');
    /* Add any additional CSS properties here */
  }
  `
const pathVariants = (strength, delay) => ({
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    scale: 3,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      delay,
      // ease: "linear",
    },
  },
})

export default function Background({ strength, delay }) {
  return (
    <svg
      className="aspect-[0.69] object-contain object-center w-full overflow-hidden"
      width={1500}
      height={623}
      viewBox="0 0 1500 623"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M816.643 200.243C816.643 200.243 755.775 74.873 564.693 73.0616C373.612 71.2501 411.893 306.251 152.626 328.216C-106.641 350.182 -577.171 182.699 -577.171 182.699"
        stroke="url(#paint0_linear_2_688)"
        variants={pathVariants(strength, delay)}
        initial="hidden"
        animate="visible"
      />{" "}
      <svg
        width="4933"
        height="3213"
        viewBox="0 0 4933 3213"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M85.5887 1392.79C85.5887 1392.79 246.617 1839.17 892.959 1914C1539.3 1988.83 1494.17 1179.36 2379.93 1198.2C3265.7 1217.03 4798.68 1953.28 4798.68 1953.28"
          stroke="url(#paint0_linear_2_445)"
        />
        <path
          d="M122.616 1291.51C122.616 1291.51 283.644 1737.89 929.986 1812.72C1576.33 1887.55 1531.19 1078.08 2416.96 1096.91C3302.72 1115.75 4835.71 1851.99 4835.71 1851.99"
          stroke="url(#paint1_linear_2_445)"
        />
        <path
          d="M164.277 1177.57C164.277 1177.57 325.305 1623.95 971.648 1698.78C1617.99 1773.61 1572.86 964.142 2458.62 982.975C3344.38 1001.81 4877.37 1738.05 4877.37 1738.05"
          stroke="url(#paint2_linear_2_445)"
        />
        <path
          d="M203.612 1069.96C203.612 1069.96 364.64 1516.34 1010.98 1591.16C1657.32 1665.99 1612.19 856.528 2497.95 875.361C3383.72 894.194 4916.7 1630.44 4916.7 1630.44"
          stroke="url(#paint3_linear_2_445)"
        />
        <path
          d="M85.5887 1392.79C85.5887 1392.79 246.617 1839.17 892.959 1914C1539.3 1988.83 1494.17 1179.36 2379.93 1198.2C3265.7 1217.03 4798.68 1953.28 4798.68 1953.28"
          stroke="url(#paint4_linear_2_445)"
        />
        <path
          d="M122.616 1291.51C122.616 1291.51 283.644 1737.89 929.986 1812.72C1576.33 1887.55 1531.19 1078.08 2416.96 1096.91C3302.72 1115.75 4835.71 1851.99 4835.71 1851.99"
          stroke="url(#paint5_linear_2_445)"
        />
        <path
          d="M164.277 1177.57C164.277 1177.57 325.305 1623.95 971.648 1698.78C1617.99 1773.61 1572.86 964.142 2458.62 982.975C3344.38 1001.81 4877.37 1738.05 4877.37 1738.05"
          stroke="url(#paint6_linear_2_445)"
        />
        <path
          d="M203.612 1069.96C203.612 1069.96 364.641 1516.34 1010.98 1591.16C1657.32 1665.99 1612.19 856.528 2497.96 875.361C3383.72 894.194 4916.7 1630.44 4916.7 1630.44"
          stroke="url(#paint7_linear_2_445)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2_445"
            x1="2169.1"
            y1="2419.89"
            x2="3743.87"
            y2="1940.92"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2_445"
            x1="2206.12"
            y1="2318.61"
            x2="2682.87"
            y2="1014.54"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2_445"
            x1="1280.55"
            y1="1743.42"
            x2="3997.91"
            y2="2208.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2_445"
            x1="2287.12"
            y1="2097.05"
            x2="2763.87"
            y2="792.982"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_2_445"
            x1="2169.1"
            y1="2419.89"
            x2="3743.87"
            y2="1940.92"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_2_445"
            x1="2206.12"
            y1="2318.61"
            x2="2682.87"
            y2="1014.54"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_2_445"
            x1="1280.55"
            y1="1743.42"
            x2="3997.91"
            y2="2208.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_2_445"
            x1="2287.12"
            y1="2097.06"
            x2="2763.87"
            y2="792.982"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1DB954" stop-opacity="0.37" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </svg>
  )
}

// import React from "react";
// import Image from "next/image";

// export default function Background() {

//     return (
//         <form>
//             <header className="header" role="banner">
//                 <svg
//                     className="aspect-[0.69] object-contain object-center w-full overflow-hidden"
//                     width='1500' height="623" viewBox="0 0 428 623" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M816.643 200.243C816.643 200.243 755.775 74.873 564.693 73.0616C373.612 71.2501 411.893 306.251 152.626 328.216C-106.641 350.182 -577.171 182.699 -577.171 182.699" stroke="url(#paint0_linear_2_688)" />
//                     <path d="M808.97 230.97C808.97 230.97 748.102 105.6 557.02 103.789C365.939 101.977 404.22 336.978 144.953 358.943C-114.314 380.909 -584.844 213.426 -584.844 213.426" stroke="url(#paint1_linear_2_688)" />
//                     <path d="M800.336 265.538C800.336 265.538 739.468 140.167 548.386 138.356C357.305 136.545 395.586 371.545 136.319 393.511C-122.948 415.476 -593.478 247.993 -593.478 247.993" stroke="url(#paint2_linear_2_688)" />
//                     <path d="M792.186 298.185C792.186 298.185 731.317 172.815 540.236 171.004C349.154 169.192 387.435 404.193 128.168 426.158C-131.099 448.124 -601.629 280.641 -601.629 280.641" stroke="url(#paint3_linear_2_688)" />
//                     <defs>
//                         <linearGradient id="paint0_linear_2_688" x1="176.317" y1="-35.111" x2="-268.735" y2="153.6" gradientUnits="userSpaceOnUse">
//                             <stop stop-color="#1DB954" stop-opacity="0.37" />
//                             <stop offset="1" stop-opacity="0" />
//                         </linearGradient>
//                         <linearGradient id="paint1_linear_2_688" x1="168.644" y1="-4.38406" x2="69.8493" y2="391.247" gradientUnits="userSpaceOnUse">
//                             <stop stop-color="#1DB954" stop-opacity="0.37" />
//                             <stop offset="1" stop-opacity="0" />
//                         </linearGradient>
//                         <linearGradient id="paint2_linear_2_688" x1="456.789" y1="134.896" x2="-351.235" y2="83.2207" gradientUnits="userSpaceOnUse">
//                             <stop stop-color="#1DB954" stop-opacity="0.37" />
//                             <stop offset="1" stop-opacity="0" />
//                         </linearGradient>
//                         <linearGradient id="paint3_linear_2_688" x1="151.859" y1="62.8312" x2="53.0646" y2="458.462" gradientUnits="userSpaceOnUse">
//                             <stop stop-color="#1DB954" stop-opacity="0.37" />
//                             <stop offset="1" stop-opacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </header>

//             <div className="container">
//                 <div className="content">
//                     <input
//                         type="text"
//                         className="input"
//                         aria-label="Example input"
//                         aria-role="textbox"
//                     />
//                     <button type="button" className="button" aria-role="button">
//                         Submit
//                     </button>
//                 </div>

//                 <div className="list">
//                     <div className="list-item" aria-role="listitem">
//                         Item 1
//                     </div>
//                     <div className="list-item" aria-role="listitem">
//                         Item 2
//                     </div>
//                     <div className="list-item" aria-role="listitem">
//                         Item 3
//                     </div>
//                 </div>

//                 <footer className="footer" role="contentinfo">
//                     <a href="https://www.example.com" className="link" aria-role="link">
//                         Link
//                     </a>
//                     <a href="https://www.example.com" className="link" aria-role="link">
//                         Another Link
//                     </a>
//                 </footer>
//             </div>
//         </form>
//     );
// }

// const lines = () => {
//     return <svg width="428" height="623" viewBox="0 0 428 623" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M816.643 200.243C816.643 200.243 755.775 74.873 564.693 73.0616C373.612 71.2501 411.893 306.251 152.626 328.216C-106.641 350.182 -577.171 182.699 -577.171 182.699" stroke="url(#paint0_linear_2_688)" />
//         <path d="M808.97 230.97C808.97 230.97 748.102 105.6 557.02 103.789C365.939 101.977 404.22 336.978 144.953 358.943C-114.314 380.909 -584.844 213.426 -584.844 213.426" stroke="url(#paint1_linear_2_688)" />
//         <path d="M800.336 265.538C800.336 265.538 739.468 140.167 548.386 138.356C357.305 1a36.545 395.586 371.545 136.319 393.511C-122.948 415.476 -593.478 247.993 -593.478 247.993" stroke="url(#paint2_linear_2_688)" />
//         <path d="M792.186 298.185C792.186 298.185 731.317 172.815 540.236 171.004C349.154 169.192 387.435 404.193 128.168 426.158C-131.099 448.124 -601.629 280.641 -601.629 280.641" stroke="url(#paint3_linear_2_688)" />
//         <defs>
//             <linearGradient id="paint0_linear_2_688" x1="176.317" y1="-35.111" x2="-268.735" y2="153.6" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#1DB954" stop-opacity="0.37" />
//                 <stop offset="1" stop-opacity="0" />
//             </linearGradient>
//             <linearGradient id="paint1_linear_2_688" x1="168.644" y1="-4.38406" x2="69.8493" y2="391.247" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#1DB954" stop-opacity="0.37" />
//                 <stop offset="1" stop-opacity="0" />
//             </linearGradient>
//             <linearGradient id="paint2_linear_2_688" x1="456.789" y1="134.896" x2="-351.235" y2="83.2207" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#1DB954" stop-opacity="0.37" />
//                 <stop offset="1" stop-opacity="0" />
//             </linearGradient>
//             <linearGradient id="paint3_linear_2_688" x1="151.859" y1="62.8312" x2="53.0646" y2="458.462" gradientUnits="userSpaceOnUse">
//                 <stop stop-color="#1DB954" stop-opacity="0.37" />
//                 <stop offset="1" stop-opacity="0" />
//             </linearGradient>
//         </defs>
//     </svg>

// }
