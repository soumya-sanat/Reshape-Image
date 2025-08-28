// // import "../../styles/loader.css";

// // const Loader = () => {
// //   return (
// //     <div className="loader-wrapper">
// //       <div className="follow-the-leader-line">
// //         <div />
// //         <div />
// //         <div />
// //         <div />
// //         <div />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Loader;

// import React from "react";

// const Loader = () => {
//   const styles = {
//     terminalLoader: {
//       border: "0.1em solid #333",
//       backgroundColor: "#1a1a1a",
//       color: "#0f0",
//       fontFamily: '"Courier New", Courier, monospace',
//       fontSize: "1em",
//       padding: "1.5em 1em",
//       width: "12em",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//       borderRadius: "4px",
//       position: "relative",
//       overflow: "hidden",
//       boxSizing: "border-box",
//     },
//     terminalHeader: {
//       position: "absolute",
//       top: "0",
//       left: "0",
//       right: "0",
//       height: "1.5em",
//       backgroundColor: "#333",
//       borderTopLeftRadius: "4px",
//       borderTopRightRadius: "4px",
//       padding: "0 0.4em",
//       boxSizing: "border-box",
//     },
//     terminalControls: {
//       float: "right",
//     },
//     control: {
//       display: "inline-block",
//       width: "0.6em",
//       height: "0.6em",
//       marginLeft: "0.4em",
//       borderRadius: "50%",
//       backgroundColor: "#777",
//     },
//     controlClose: {
//       backgroundColor: "#e33",
//     },
//     controlMinimize: {
//       backgroundColor: "#ee0",
//     },
//     controlMaximize: {
//       backgroundColor: "#0b0",
//     },
//     terminalTitle: {
//       float: "left",
//       lineHeight: "1.5em",
//       color: "#eee",
//     },
//     text: {
//       display: "inline-block",
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       borderRight: "0.2em solid green",
//       animation:
//         "typeAndDelete 4s steps(11) infinite, blinkCursor 0.5s step-end infinite alternate",
//       marginTop: "1.5em",
//     },
//     keyframes: `
//       @keyframes blinkCursor {
//         50% {
//           border-right-color: transparent;
//         }
//       }
//       @keyframes typeAndDelete {
//         0%, 10% {
//           width: 0;
//         }
//         45%, 55% {
//           width: 6.2em;
//         }
//         90%, 100% {
//           width: 0;
//         }
//       }
//     `,
//   };

//   return (
//     <>
//       <style>{styles.keyframes}</style>
//       <div style={styles.terminalLoader}>
//         <div style={styles.terminalHeader}>
//           <div style={styles.terminalTitle}>Status</div>
//           <div style={styles.terminalControls}>
//             <div style={{ ...styles.control, ...styles.controlClose }} />
//             <div style={{ ...styles.control, ...styles.controlMinimize }} />
//             <div style={{ ...styles.control, ...styles.controlMaximize }} />
//           </div>
//         </div>
//         <div style={styles.text}>Loading...</div>
//       </div>
//     </>
//   );
// };

// export default Loader;
// // import "../../styles/loader.css";

// // const Loader = () => {
// //   return (
// //     <div className="loader-wrapper">
// //       <div className="follow-the-leader-line">
// //         <div />
// //         <div />
// //         <div />
// //         <div />
// //         <div />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Loader;

// import React from "react";

// const Loader = () => {
//   const styles = {
//     terminalLoader: {
//       border: "0.1em solid #333",
//       backgroundColor: "#1a1a1a",
//       color: "#0f0",
//       fontFamily: '"Courier New", Courier, monospace',
//       fontSize: "1em",
//       padding: "1.5em 1em",
//       width: "12em",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//       borderRadius: "4px",
//       position: "relative",
//       overflow: "hidden",
//       boxSizing: "border-box",
//     },
//     terminalHeader: {
//       position: "absolute",
//       top: "0",
//       left: "0",
//       right: "0",
//       height: "1.5em",
//       backgroundColor: "#333",
//       borderTopLeftRadius: "4px",
//       borderTopRightRadius: "4px",
//       padding: "0 0.4em",
//       boxSizing: "border-box",
//     },
//     terminalControls: {
//       float: "right",
//     },
//     control: {
//       display: "inline-block",
//       width: "0.6em",
//       height: "0.6em",
//       marginLeft: "0.4em",
//       borderRadius: "50%",
//       backgroundColor: "#777",
//     },
//     controlClose: {
//       backgroundColor: "#e33",
//     },
//     controlMinimize: {
//       backgroundColor: "#ee0",
//     },
//     controlMaximize: {
//       backgroundColor: "#0b0",
//     },
//     terminalTitle: {
//       float: "left",
//       lineHeight: "1.5em",
//       color: "#eee",
//     },
//     text: {
//       display: "inline-block",
//       whiteSpace: "nowrap",
//       overflow: "hidden",
//       borderRight: "0.2em solid green",
//       animation:
//         "typeAndDelete 4s steps(11) infinite, blinkCursor 0.5s step-end infinite alternate",
//       marginTop: "1.5em",
//     },
//     keyframes: `
//       @keyframes blinkCursor {
//         50% {
//           border-right-color: transparent;
//         }
//       }
//       @keyframes typeAndDelete {
//         0%, 10% {
//           width: 0;
//         }
//         45%, 55% {
//           width: 6.2em;
//         }
//         90%, 100% {
//           width: 0;
//         }
//       }
//     `,
//   };

//   return (
//     <>
//       <style>{styles.keyframes}</style>
//       <div style={styles.terminalLoader}>
//         <div style={styles.terminalHeader}>
//           <div style={styles.terminalTitle}>Status</div>
//           <div style={styles.terminalControls}>
//             <div style={{ ...styles.control, ...styles.controlClose }} />
//             <div style={{ ...styles.control, ...styles.controlMinimize }} />
//             <div style={{ ...styles.control, ...styles.controlMaximize }} />
//           </div>
//         </div>
//         <div style={styles.text}>Loading...</div>
//       </div>
//     </>
//   );
// };

// export default Loader;
// import React from "react";

const Loader = () => {
  const styles = {
    loader: {
      position: "relative",
      width: "54px",
      height: "54px",
      borderRadius: "10px",
    },
    bar: {
      width: "8%",
      height: "24%",
      background: "rgb(128, 128, 128)",
      position: "absolute",
      left: "50%",
      top: "30%",
      opacity: "0",
      borderRadius: "50px",
      boxShadow: "0 0 3px rgba(0,0,0,0.2)",
      animation: "fade458 1s linear infinite",
    },
    keyframes: `
      @keyframes fade458 {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.25;
        }
      }
    `,
    bar1: {
      transform: "rotate(0deg) translate(0, -130%)",
      animationDelay: "0s",
    },
    bar2: {
      transform: "rotate(30deg) translate(0, -130%)",
      animationDelay: "-1.1s",
    },
    bar3: {
      transform: "rotate(60deg) translate(0, -130%)",
      animationDelay: "-1s",
    },
    bar4: {
      transform: "rotate(90deg) translate(0, -130%)",
      animationDelay: "-0.9s",
    },
    bar5: {
      transform: "rotate(120deg) translate(0, -130%)",
      animationDelay: "-0.8s",
    },
    bar6: {
      transform: "rotate(150deg) translate(0, -130%)",
      animationDelay: "-0.7s",
    },
    bar7: {
      transform: "rotate(180deg) translate(0, -130%)",
      animationDelay: "-0.6s",
    },
    bar8: {
      transform: "rotate(210deg) translate(0, -130%)",
      animationDelay: "-0.5s",
    },
    bar9: {
      transform: "rotate(240deg) translate(0, -130%)",
      animationDelay: "-0.4s",
    },
    bar10: {
      transform: "rotate(270deg) translate(0, -130%)",
      animationDelay: "-0.3s",
    },
    bar11: {
      transform: "rotate(300deg) translate(0, -130%)",
      animationDelay: "-0.2s",
    },
    bar12: {
      transform: "rotate(330deg) translate(0, -130%)",
      animationDelay: "-0.1s",
    },
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div style={styles.loader}>
        <div style={{ ...styles.bar, ...styles.bar1 }} />
        <div style={{ ...styles.bar, ...styles.bar2 }} />
        <div style={{ ...styles.bar, ...styles.bar3 }} />
        <div style={{ ...styles.bar, ...styles.bar4 }} />
        <div style={{ ...styles.bar, ...styles.bar5 }} />
        <div style={{ ...styles.bar, ...styles.bar6 }} />
        <div style={{ ...styles.bar, ...styles.bar7 }} />
        <div style={{ ...styles.bar, ...styles.bar8 }} />
        <div style={{ ...styles.bar, ...styles.bar9 }} />
        <div style={{ ...styles.bar, ...styles.bar10 }} />
        <div style={{ ...styles.bar, ...styles.bar11 }} />
        <div style={{ ...styles.bar, ...styles.bar12 }} />
      </div>
    </>
  );
};

export default Loader;
