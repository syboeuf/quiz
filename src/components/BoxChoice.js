import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const BoxChoice = ({ selectChoice, choice, setChoice }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        m: 2,
        borderRadius: 2,
        border: "1px solid black",
        paddingY: 1,
        paddingX: 2,
        backgroundColor:
          choice === selectChoice ? theme.palette.primary.main : "white",
        color: choice === selectChoice ? "white" : "black",
        cursor: "pointer",
      }}
      onClick={() => setChoice(selectChoice)}
    >
      {selectChoice}
    </Box>
  );
};

export default BoxChoice;
