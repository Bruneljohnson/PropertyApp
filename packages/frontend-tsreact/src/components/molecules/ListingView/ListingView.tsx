import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Box, Grid, Typography, } from "@mui/material";
import { Chip } from "@mui/material";
import { useEffect } from "react";

import { type PropertyListingType } from "../../../types";
import { capitalizeFirstLetterOfEachWord,ChipListItem } from "../../atoms";
import { Image } from "../../atoms/Image";

const getRandomColor = () => {
  const colors = ["50086E", "49056E", "538F", "49064f", "50034E", "50364f", "49077e"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const splitSummary = (str: string): string[] => {
  return str.split(".");
}

export const ListingView = ({
  streetName,
  city,
  postcode,
  summary,
  bedrooms,
  livingrooms,
  bathrooms,
  price,
  imageUrl,
}: PropertyListingType): JSX.Element => {
  const summaryLines = splitSummary(summary);
  useEffect(() => {
    const container = document.querySelector("#randomSquaresContainer") as HTMLElement;

    if (container) {
      const squareSize = 49; // Adjust this value if you want a different square size
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const numPerRow = Math.floor(containerWidth / squareSize) + 1;
      const numRows = Math.ceil(containerHeight / squareSize);

      for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
        for (let colIdx = 0; colIdx < numPerRow; colIdx++) {
          const square = document.createElement("div");
          square.style.width = `${squareSize}px`;
          square.style.height = `${squareSize}px`;
          square.style.backgroundColor = `#${getRandomColor()}`;
          square.style.position = "absolute";
          square.style.left = `${colIdx * squareSize}px`;
          square.style.top = `${rowIdx * squareSize}px`;
          container.append(square);
        }
      }
    }
  }, []);

  return (
    <Grid
      container
      width="100%"
      position="relative"
      gridTemplateColumns="1fr 1fr 1fr"
      gap={1}
      
    >
      <Grid item padding={4} borderColor="gray.400"  display="flex" flexDirection="column" boxShadow={1} gap={1}>
        <Typography component="h1" variant="h6" color="gray.500" textAlign="left" fontSize={25} fontWeight="600" m={0} >
          {`${bedrooms} Bedroom Property for Sale in ${postcode.toUpperCase().split(" ")[0]}.`}
        </Typography>
        <Grid container sx={{ display: "flex" }} boxShadow={1} overflow="hidden">
          <Image image={imageUrl} imageSizeNo={550} alt="Property Main"/>
        </Grid>
      </Grid>

      <Grid item padding={3} borderColor="gray.400"  display="flex" flexDirection="column" boxShadow={1} >  
       <Typography component="h2" variant="h6" color="secondary.alt" textAlign="center" fontSize={30} fontWeight="600">
          {`£${Number(price).toLocaleString()}`}
        </Typography>
        <Box
        component="ul"
        display="flex"
        justifyContent="space-around"
        alignItems="start"
          padding={0}
          gap={3}
        sx={{ listStyle: "none" }}
        m="auto"
        >
         
        <Box display="flex"  justifyContent="flex-start"  gap={0.5}>
        <ChipListItem  >
          <Chip label={`${livingrooms}`} size="medium" />
          </ChipListItem>
          <WeekendIcon fontSize="large"/>
        </Box>

        <Box display="flex" justifyContent="center" gap={0.5} >
        <ChipListItem  >
          <Chip label={`${bedrooms}`} size="medium" />
          </ChipListItem>
          <BedIcon fontSize="large"/>
        </Box>

        <Box display="flex" justifyContent="center" gap={0.5} >
        <ChipListItem  >
          <Chip label={`${bathrooms}`} size="medium" />
          </ChipListItem>
          <BathtubIcon fontSize="large"/>
        </Box>
        </Box>
        <Typography variant="subtitle1" color="grey.600" textAlign="center">{`${capitalizeFirstLetterOfEachWord(streetName)}, ${postcode.toUpperCase().split(" ")[0]}, ${capitalizeFirstLetterOfEachWord(city)} `}</Typography>
      </Grid>

      <Grid item padding={3} borderColor="gray.400" display="flex" flexDirection="column" width="0.5fr" boxShadow={1} gap={1} m="auto">  
        <Typography component="h5" variant="h6" color="grey.500" textAlign="left" fontWeight={500} >
          {capitalizeFirstLetterOfEachWord("more details...")}
        </Typography>
        {summaryLines.map((line, i) => 
          
          (i < summaryLines.length-1 && (<Typography component="p" variant="h6" color="grey.700" textAlign="left" fontSize="small" key={i}>
          {capitalizeFirstLetterOfEachWord(`${line}.`)}
        </Typography>))
        )
        }
      </Grid>

        <Grid item padding={3} borderColor="gray.400" width="100%" display="flex" flexDirection="column" boxShadow={1} gap={1} position="relative" > 
        {/* Container for random squares */}
        <div
          id="randomSquaresContainer"
          style={{
            position: "relative",
            width: "100%",
            height: "50px",
            overflow: "hidden",
          
          }}
        />
      </Grid>
    </Grid>
  );
};
