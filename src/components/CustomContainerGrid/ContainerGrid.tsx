import { Container, Grid } from "@mui/material";

export default function ContainerGrid() {
  return (
    <Container maxWidth={false}>
      <Grid
        my={{ md: 5, xs: 0 }}
        container
        columnSpacing={{ xs: 1, md: 6 }}
        paddingX={{ md: 20, xs: 0 }}
      ></Grid>
    </Container>
  );
}
