import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { type PropertyListingType } from "types";

const getRandomColor = () => {
  const colors = ["458EEA", "3E81D4", "4187DF", "3E81D4", "4289E2", "438CE6", "4792F0"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const ListingView = ({
  id,
  address,
  description,
  bedrooms,
  livingrooms,
  bathrooms,
  price,
  imageName,
  imageUrl,
}: PropertyListingType): JSX.Element => {
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
      sx={{
        border: "2px solid primary.main",
      }}
    >
      <Grid item xs={9} padding={4} sx={{ border: 2 }}>
        <h1 style={{ margin: 0 }}>Experience highlights</h1>
        <Grid container sx={{ display: "flex", paddingLeft: "12px" }}>
          <ImageList cols={1} sx={{ width: 211, height: 211 }}>
            <ImageListItem>
              {/* change back to imageUrl later - import as bio type */}
              <img src={imageUrl} alt="Property for this listing" />
            </ImageListItem>
          </ImageList>
        </Grid>
      </Grid>

      <Grid
        item
        xs={3}
        sx={{
          maxHeight: "800px",
          padding: "25px",
          overflow: "scroll",
          position: "relative",
          backgroundColor: "#",
          zIndex: "5",
        }}
      >
        {/* Container for random squares */}
        <div
          id="randomSquaresContainer"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            marginTop: "-25px",
            marginLeft: "-25px",
            zIndex: "-1",
            overflow: "hidden",
          }}
        />

        <Typography sx={{ color: "#fff", fontWeight: "600" }} variant="h5">
          {`${bedrooms} Bedroom House for Sale.`}
        </Typography>

        <Box sx={{ margin: "16px 0" }}>
          <Typography
            sx={{ color: "#fff", fontWeight: "600", textTransform: "uppercase" }}
            variant="h6"
          >
            Overview:
          </Typography>
          <Typography style={{ color: "#fff" }}>{description}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
