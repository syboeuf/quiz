import GlobalContainer from "components/GlobalContainer";
import { useNavigate } from "react-router-dom";
import quiz from "utils/quiz";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const Home = () => {
  const navigate = useNavigate();
  return (
    <GlobalContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="center">Quiz</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {Object.keys(quiz).map((quizName, index) => {
              const { image, path } = quiz[quizName];
              return (
                <Card sx={{ width: 320 }} key={index}>
                  <CardActionArea onClick={() => navigate(path)}>
                    <Box
                      sx={{
                        position: "relative",
                        backgroundImage: `url(${image})`,
                        backgroundSize: "320px 160px",
                        height: 160,
                      }}
                    >
                      <Box
                        sx={{
                          zIndex: 10,
                          position: "absolute",
                          bottom: 0,
                          backgroundColor: "black",
                          width: "100%",
                        }}
                      >
                        <Typography align="center" sx={{ color: "white" }}>
                          {quizName}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </GlobalContainer>
  );
};

export default Home;
