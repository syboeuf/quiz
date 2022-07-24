import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const genres = ["Film", "Culture générale", "Histoire", "Séries", "Géographie"];

const nbOfChoices = [2, 3, 4];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const GeneralData = ({ handleNext }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [themes, setThemes] = useState([]);
  const [nbChoices, setNbChoices] = useState(2);
  const [error, setError] = useState(null);

  const handleChangeTitle = (e) => {
    const { value } = e.target;
    if (value.length > 50) {
      return;
    }
    setTitle(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setThemes(typeof value === "string" ? value.split(",") : value);
  };

  const nextStep = () => {
    if (
      !title.trim().length ||
      !themes.length ||
      !nbOfChoices.includes(nbChoices)
    ) {
      setError("Un champs est mal rempli !");
      return;
    }
    handleNext({ title, themes, nbChoices });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography sx={{ mb: 1 }}>Titre du quiz</Typography>
        <TextField
          onChange={(e) => handleChangeTitle(e)}
          value={title}
          required
          fullWidth
          placeholder="Exemple: Spider-man"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ mb: 1 }}>Themes</Typography>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            multiple
            value={themes}
            onChange={handleChange}
            input={<OutlinedInput label="Genre" />}
            MenuProps={MenuProps}
          >
            {genres.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography>Nombre de choix par reponses</Typography>
        <Box display="flex">
          {nbOfChoices.map((choice, index) => (
            <Box
              sx={{
                m: 2,
                borderRadius: 2,
                border: "1px solid black",
                paddingY: 1,
                paddingX: 2,
                backgroundColor:
                  choice === nbChoices ? theme.palette.primary.main : "white",
                color: choice === nbChoices ? "white" : "black",
              }}
              key={index}
              onClick={() => setNbChoices(choice)}
            >
              {choice}
            </Box>
          ))}
        </Box>
      </Grid>
      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button onClick={() => nextStep()}>Suivant</Button>
      </Grid>
    </Grid>
  );
};

export default GeneralData;
