import React, { useRef } from "react";
import gsap from "gsap-trial";
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin";
import "./Confetti.css";

gsap.registerPlugin(Physics2DPlugin);
gsap.config({ trialWarn: false });

export default function Confetti() {
  const emitterRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const containerRefs = useRef([
    React.createRef(null),
    React.createRef(null),
    React.createRef(null),
  ]);

  const animateParticles = (parent, quantity, x, y, minAngle, maxAngle) => {
    let colors = ["#FFFF04", "#EA4C89", "#892AB8", "#4AF2FD"];
    for (let i = quantity - 1; i >= 0; i--) {
      let angle = gsap.utils.random(minAngle, maxAngle),
        velocity = gsap.utils.random(70, 140),
        dot = document.createElement("div");
      dot.style.setProperty("--b", colors[Math.floor(gsap.utils.random(0, 4))]);
      parent.appendChild(dot);
      gsap.set(dot, {
        opacity: 0,
        x: x,
        y: y,
        scale: gsap.utils.random(0.4, 0.7),
      });
      gsap
        .timeline({
          onComplete() {
            dot.remove();
          },
        })
        .to(
          dot,
          {
            duration: 0.05,
            opacity: 1,
          },
          0
        )
        .to(
          dot,
          {
            duration: 1.8,
            rotationX: `-=${gsap.utils.random(720, 1440)}`,
            rotationZ: `+=${gsap.utils.random(720, 1440)}`,
            physics2D: {
              angle: angle,
              velocity: velocity,
              gravity: 120,
            },
          },
          0
        )
        .to(
          dot,
          {
            duration: 1,
            opacity: 0,
          },
          0.8
        );
    }
  };

  const handleClick = (index) => {
    const button = emitterRefs.current[index].current;
    const containerRef = containerRefs.current[index].current;
    containerRef.classList.add("success");
    gsap.to(containerRef, {
      "--icon-x": -3,
      "--icon-y": 3,
      "--z-before": 0,
      duration: 0.2,
      onComplete() {
        animateParticles(button, 100, -4, 6, -80, -50);
        gsap.to(button, {
          duration: 1,
          ease: "elastic.out(1, .5)",
          onComplete() {
            containerRef.classList.remove("success");
            gsap.to(containerRef, {
              "--icon-x": 0,
              "--icon-y": 0,
              "--z-before": -6,
            });
          },
        });
      },
    });
  };

  return (
    <div className="confetti-wrapper p-2 flex flex-row gap-2">
      <button
        className="button bg-blueGrad rounded-lg"
        onClick={() => handleClick(0)}
        ref={containerRefs.current[0]}
      >
        <div className="icon">
          <div className="cannon"></div>
          <div className="confetti">
            <svg viewBox="0 0 18 16">
              <polyline points="1 10 4 7 4 5 6 1" />
              <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
              <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
            </svg>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <div className="emitter" ref={emitterRefs.current[0]}></div>
          </div>
        </div>
        <span> Celebrate! </span>
      </button>

      <button
        className="button bg-blueGrad rounded-lg"
        onClick={() => handleClick(1)}
        ref={containerRefs.current[1]}
      >
        <div className="icon">
          <div className="cannon"></div>
          <div className="confetti">
            <svg viewBox="0 0 18 16">
              <polyline points="1 10 4 7 4 5 6 1" />
              <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
              <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
            </svg>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <div className="emitter" ref={emitterRefs.current[1]}></div>
          </div>
        </div>
        <span> Celebrate! </span>
      </button>

      <button
        className="button bg-blueGrad rounded-lg"
        onClick={() => handleClick(2)}
        ref={containerRefs.current[2]}
      >
        <div className="icon">
          <div className="cannon"></div>
          <div className="confetti">
            <svg viewBox="0 0 18 16">
              <polyline points="1 10 4 7 4 5 6 1" />
              <path d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4" />
              <path d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7" />
            </svg>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <div className="emitter" ref={emitterRefs.current[2]}></div>
          </div>
        </div>
        <span> Celebrate! </span>
      </button>
    </div>
  );
}
