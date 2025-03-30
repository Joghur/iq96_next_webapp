type Props = {
  children: React.ReactNode;
  className?: string;
};

export const DynamicText = ({ children, className = '' }: Props) => (
  <p
    className={`text-xs subpixel-antialiased sm:text-sm md:text-base lg:text-lg xl:text-xl ${className}`}
  >
    {children}
  </p>
);
