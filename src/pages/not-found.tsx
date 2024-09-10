const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1 className="text-center">404 - Page Not Found</h1>
        <p className="text-center">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
