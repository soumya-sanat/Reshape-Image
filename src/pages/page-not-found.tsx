import logoNotFound from "../assets/not-found.svg";
import "../styles/page-not-found.css";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {/* Animated SVG Blob */}
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-[500px] max-h-[500px] animate-blob absolute z-0"
        >
          <path
            fill="#3944BC"
            d="M39.3,-59.8C54,-51.7,71.2,-46,78.8,-34.5C86.4,-22.9,84.5,-5.5,80.5,10.5C76.4,26.5,70.4,41.1,61,54.2C51.7,67.4,39.2,79.1,25.2,81C11.2,82.9,-4.3,75,-17.9,67.9C-31.5,60.7,-43.4,54.3,-50.5,44.6C-57.7,34.9,-60.1,21.9,-62.4,8.7C-64.6,-4.5,-66.7,-17.9,-63.3,-30.3C-59.9,-42.8,-51,-54.1,-39.5,-63.8C-28,-73.4,-14,-81.4,-0.9,-80C12.3,-78.7,24.6,-68,39.3,-59.8Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Logo Image */}
        <img
          src={logoNotFound}
          alt="Page Not Found"
          className="relative z-10 max-w-[400px] max-h-[400px] drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
