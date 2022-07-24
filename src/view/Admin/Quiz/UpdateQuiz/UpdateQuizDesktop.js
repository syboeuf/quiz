import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const UpdateQuizDesktop = ({ quiz }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const { gameData } = quiz;
  console.log(quiz);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sx={{ borderRight: "1px solid black" }}>
        <List>
          <ListItem disablePadding divider>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Général" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setShowQuestions(!showQuestions)}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" />
              <ListItemSecondaryAction>
                {showQuestions ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </ListItemSecondaryAction>
            </ListItemButton>
            <div>Test</div>
          </ListItem>
        </List>
        <List>
          {gameData.map(({ question }, index) => (
            <ListItem disablePadding>
              <ListItemButton onClick={() => setShowQuestions(!showQuestions)}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={9}></Grid>
    </Grid>
  );
};

export default UpdateQuizDesktop;
