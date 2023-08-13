import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Box, Chip, IconButton, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { type ListingListItemProps } from "./Listing-ListItem.type";

const ChipListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const imageSize = 70;
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
  description,
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
      <Box display="flex" flexDirection="column" minWidth="200px">
        <Typography component="h3" variant="h6" color="grey.900">
          {capitalizeFirstLetterOfEachWord(address)}
        </Typography>
        <Typography variant="subtitle1">Squad {address}</Typography>
      </Box>
      <Typography component="p" fontWeight="normal" variant="h6" minWidth="300px">
        {description}
      </Typography>

      <Box
        component="ul"
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        sx={{ listStyle: "none" }}
      >
        <ChipListItem>
          <Chip label={`${livingrooms} Living rooms`} size="medium" />
        </ChipListItem>
        <ChipListItem>
          <Chip label={`${bedrooms} Bedrooms`} size="medium" />
        </ChipListItem>
        <ChipListItem>
          <Chip label={`${bathrooms} Bathrooms`} size="medium" />
        </ChipListItem>
      </Box>

      <IconButton component={Link} to={id} color="secondary" size="large" sx={{ ml: "auto" }}>
        <ArrowCircleRightIcon fontSize="large" />
      </IconButton>
    </Box>
  </Box>
);
