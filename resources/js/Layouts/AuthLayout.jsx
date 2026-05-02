const AuthLayout = ({ children }) => {
  return (
    <div className="bg-background">
      <div className="mx-auto min-h-dvh max-w-xl p-4 md:flex md:flex-col md:items-center md:justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
