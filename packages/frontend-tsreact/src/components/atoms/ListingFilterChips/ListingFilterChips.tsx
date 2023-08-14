import { Box, Chip, Skeleton, styled } from "@mui/material";

import { type ListingFilterChipsProps } from "./ListingFilterChips.type";

const spacing = 0.75;

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(spacing),
}));

export const ListingFilterChips = ({
  error,
  items,
  loading,
  selection,
  setSelection,
  size = "medium",
}: ListingFilterChipsProps): JSX.Element => (
  <Box
    component="ul"
    display="flex"
    justifyContent="flex-start"
    flexWrap="wrap"
    pl={0}
    ml={-spacing}
    my={0}
    sx={{ listStyle: "none" }}
  >
    {loading || error
      ? Array.from({ length: 6 }).map((_, i) => (
          <ListItem key={`chip${i}`}>
            <Skeleton
              animation="wave"
              height="32px"
              sx={{ borderRadius: 30 }}
              variant="rounded"
              width={70}
            />
          </ListItem>
        ))
      : items.map((item, i) => (
          <ListItem key={`chip${i}`}>
            <Chip
              label={item.label}
              sx={{ size: { xs: "small", md: `${size}` }, fontSize: { xs: "10px", md: "16px" }, width: { xs: "100%" }, padding:{xs:"2px"} }}
              onClick={() => {
                setSelection(item);
              }}
              {...(selection.includes(item.key) && { color: "primary" })}
            />
          </ListItem>
        ))}
  </Box>
);
