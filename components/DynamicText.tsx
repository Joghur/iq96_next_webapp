interface Props {
  children?: React.ReactNode;
}

export default function DynamicText({children}: Props) {
  // const theme = useTheme();
  // const small = useMediaQuery(theme.breakpoints.down('sm'));

  return <p>{children}</p>;
}
