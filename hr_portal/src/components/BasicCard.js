import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

const cardItem = [
  {
    title: "Total Employee",
    icon: <GroupsIcon />,
    number: 2765,
    progress: 70,
  },
  {
    title: "Total Attendence",
    icon: <GroupsIcon />,
    number: 2760,
    progress: 40,
  },
  {
    title: "Total Zone",
    icon: <GroupsIcon />,
    number: 450,
    progress: 30,
  },{
    title: "Total Zone",
    icon: <GroupsIcon />,
    number: 450,
    progress: 30,
  },
];

export default function BasicCard() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {cardItem.map((item) => {
        return (
          <Card sx={{ width: 300, margin: 1, backgroundColor: '#EADDFF' }}>
            <CardContent>
              <Typography variant="h5" color="#21005E">
                {item.icon}
                {item.title}
              </Typography>
              <Typography variant="h4" color="#21005E">
                {item.number}
              </Typography>
              <LinearProgress variant="determinate" value={item.progress} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
