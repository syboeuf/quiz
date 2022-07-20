import Container from "@mui/material/Container";

const GlobalContainer = ({ children }) => (
  <Container sx={{ pt: 4, pb: 4 }}>{children}</Container>
);

export default GlobalContainer;
