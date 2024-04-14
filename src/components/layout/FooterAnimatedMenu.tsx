"use client";

import { useState } from "react";

const TabBar = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const li = target.parentElement!;
    const ul = li.parentElement!;

    if (!ul.classList.contains("move") && !li.classList.contains("active")) {
      ul.querySelectorAll("li").forEach((li) => {
        li.classList.remove("active");
      });

      ul.style.setProperty("--x-n", `${li.offsetLeft + li.offsetWidth / 2}px`);
      li.classList.add("move");
      ul.classList.add("move");

      setIsAnimating(true);

      setTimeout(() => {
        ul.classList.remove("move");
        li.classList.remove("move");
        li.classList.add("active");
        ul.style.setProperty("--x", `${li.offsetLeft + li.offsetWidth / 2}px`);
        setIsAnimating(false);
      }, 1200);
    }
  };

  return (
    <div className="sm:hidden frame">
      <span className="frame__inner">
        <ul className="tabbar">
          <li className="active">
            <a
              href="https://wa.me/636590707"
              className="box"
              onClick={handleClick}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>

                <em></em>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="home" onClick={handleClick}>
              <div>
                <svg>
                  <use xlinkHref="#home" />
                </svg>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="calendar" onClick={handleClick}>
              <div>
                <svg>
                  <use xlinkHref="#calendar" />
                </svg>
                <em></em>
              </div>
            </a>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default TabBar;
