type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <span className="absolute inset-0 bg-white opacity-20 blur-md"></span>
      <span className="relative" onClick={onClick}>
        {children}
      </span>
    </button>
  );
};
