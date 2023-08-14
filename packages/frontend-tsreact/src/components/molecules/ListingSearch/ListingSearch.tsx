import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { LISTING_SEARCH_KEYS } from "../../../config";
import { useSearch } from "../../../hooks";
import { ListingFiltersContext } from "../../../providers";
import { getCharsBetweenIndices } from "../../../utils";
import { type ListingSearchProps } from "./ListingSearch.type";

const width = "100%";
const minMatchCharLength = 2;

export const ListingSearch = ({ loading = true }: ListingSearchProps): JSX.Element => {
  const { listingsData } = useContext(ListingFiltersContext);
  const { searchValue, setSearchValue, searchResults } = useSearch(
    listingsData || [],
    LISTING_SEARCH_KEYS,
  );

  const [showPopover, setShowPopover] = useState(false);

  const popoverRef = useRef(null);

  const handleClearClick = (event) => {
    event.stopPropagation();
    setSearchValue("");
  };

  useEffect(() => {
    setShowPopover(searchValue.length > 1);
  }, [searchValue]);

  return (
    <>
      <Paper
        ref={popoverRef}
        elevation={0}
        onClick={() => {
          setShowPopover(searchValue.length > minMatchCharLength);
        }}
        sx={{
          px: 1.5,
          height: 50,
          display: "flex",
          alignItems: "center",
          border: 1,
          borderColor: "grey.300",
          width,
        }}
      >
        <Box display="flex" width={35}>
          {loading ? <CircularProgress size={20} sx={{ color: "grey.500" }} /> : <SearchIcon />}
        </Box>
        <InputBase
          onChange={event => {
            setSearchValue(event.target.value);
          }}
          placeholder="Search Area e.g London or W3 "
          disabled={loading}
          sx={{ flex: 1 }}
          size="medium"
          value={searchValue}
        />

        {searchValue.length > 0 && (
          <IconButton
            aria-label="clear"
            onClick={event => {
              handleClearClick(event);
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Paper>

      <Popover
        open={showPopover}
        anchorEl={popoverRef.current}
        onClose={() => {
          setShowPopover(false);
        }}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2}>
          <Typography variant="subtitle1">
            {searchResults.length === 0
              ? "Sorry, we couldn't find an property listing."
              : "We have some suggestions:"}
          </Typography>

          {searchResults.length > 0 && (
            <Stack spacing={1} mt={2}>
              {searchResults.slice(0, 10).map(({ item, matches }, i) => (
                <Box key={i} display="flex" alignSelf="flex-start" alignItems="center">
                  <Box
                    component={Link}
                    to={item.id}
                    py={1}
                    px={1.5}
                    bgcolor="grey.200"
                    color="grey.800"
                    borderRadius={2}
                    mr={2}
                    sx={{
                      transition: "ease 250ms",
                      "&:hover": {
                        backgroundColor: "grey.300",
                      },
                    }}
                  >
                    <Typography>{item.postcode}</Typography>
                  </Box>

                  {matches && (
                    <Typography color="grey.400" variant="body2">
                      {matches.map(({ value, indices }, i) => {
                        if (!value) {
                          return;
                        }
                        const { result, before, after } = getCharsBetweenIndices(value, indices[0]);
                        return (
                          <Fragment key={i}>
                            {before}
                            <Box component="span" color="secondary.main" fontWeight="semi-bold">
                              {result}
                            </Box>
                            {after}
                            {matches[i + 1] && ", "}
                          </Fragment>
                        );
                      })}
                    </Typography>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Popover>
    </>
  );
};
