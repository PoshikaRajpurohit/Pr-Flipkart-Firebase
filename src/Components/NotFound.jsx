import '../App.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary">Go to Home</a>
    </div>
  );
};

export default NotFound;
