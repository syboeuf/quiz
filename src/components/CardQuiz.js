import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const CardQuiz = ({ click, quizName, image }) => (
  <Card sx={{ width: 320 }}>
    <CardActionArea onClick={() => click()}>
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

export default CardQuiz;
