import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className="container">
      <h1 className="heading">404 - Page Not Found</h1>
      <p className="text">Sorry, the page you requested could not be found.</p>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          .heading {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          .text {
            font-size: 1.5rem;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
