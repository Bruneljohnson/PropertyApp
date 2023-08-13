import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import WeekendIcon from '@mui/icons-material/Weekend';
import { Box, Chip, IconButton, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { type ListingListItemProps } from "./Listing-ListItem.type";

const ChipListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const imageSize = 200;
const capitalizeFirstLetterOfEachWord = (str: string) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const ListingListItem = ({
  id,
  address,
  imageName,
  imageUrl,
  summary,
  bedrooms,
  livingrooms,
  bathrooms,
}: ListingListItemProps): JSX.Element => (
  <Box
    display="flex"
    alignItems="center"
    color="grey.800"
    width="100%"
    py={1.5}
    px={2}
    bgcolor="#ffffff"
    borderRadius={3}
    border={1}
    borderColor="grey.300"
  >
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        component="img"
        minHeight={imageSize}
        minWidth={imageSize}
        maxHeight={imageSize}
        maxWidth={imageSize}
        borderRadius={0.75}
        sx={{ objectFit: "cover" }}
        alt={imageName}
        src={imageUrl}
      />
    </Box>
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      ml={3}
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" minWidth="200px" width="75%">
        <Typography component="h3" variant="h6" color="grey.900" textAlign="left">
          {capitalizeFirstLetterOfEachWord(`${bedrooms} Bedroom Property`)}
        </Typography>
        <Typography variant="subtitle1" textAlign="left">{capitalizeFirstLetterOfEachWord(address)}</Typography>
      </Box>
      <Typography component="p" fontWeight="normal" variant="h6" minWidth="300px" textAlign="left" width="75%" fontSize={14}>
        {summary}
      </Typography>

      <Box
        component="ul"
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        sx={{ listStyle: "none" }}
      >
        <Box display="flex" justifyContent="center" gap={0.5}>
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

      <IconButton component={Link} to={id} color="secondary" size="large" sx={{ ml: "auto" }}>
        <ArrowCircleRightIcon fontSize="large" />
      </IconButton>
    </Box>
  </Box>
);
