import { Box } from "./Box";

export const Layout = ({ children }:{children:any}) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </Box>
);