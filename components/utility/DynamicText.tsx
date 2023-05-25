interface Props {
  children?: React.ReactNode;
}

export default function DynamicText({ children }: Props) {
  return <p className="dynamic_text">{children}</p>;
}
