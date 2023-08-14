import { Box, Stack } from "@mui/material";
import { useContext, useState } from "react";

import { ListingFiltersContext } from "../../../providers";
import { ListingFilter } from "./ListingFilter";
import { type ListingFiltersProps } from "./ListingFilters.type";

export const ListingFilters = ({
  loading = true,
  error = false,
}: ListingFiltersProps): JSX.Element => {
  const { filters } = useContext(ListingFiltersContext);
  const [openIndexes, setOpenIndexes] = useState([0, 1]);

  const handleAccordionClick = (num: number) => {
    const index = openIndexes.indexOf(num);
    setOpenIndexes(
      index === -1 ? [...openIndexes, num] : openIndexes.filter(index => index !== num),
    );
  };

  return (
    <Box
      position="sticky"
      top={38}
      bgcolor="#ffffff"
      borderRadius={3}
      overflow="hidden"
      border={1}
      height="calc(100vh - 300px)"
      borderColor="grey.300"
      mb={3}
      sx={{
        "&:before": {
          content: "''",
          position: "absolute",
          height: 16,
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundImage: "linear-gradient(#ffffff  33%, transparent)",
        },
        "&:after": {
          content: "''",
          position: "absolute",
          height: 16,
          width: "100%",
          bottom: 0,
          left: 0,
          zIndex: 1,
          backgroundImage: "linear-gradient(transparent, #ffffff 66%)",
        },
      }}
    >
      <Stack width="100%" spacing={2} height="100%" p={2} sx={{ overflowY: "auto" }}>
        {filters.map((props, i) => {
          const handleFilterSelect = item => {
            const { setSelection, selection } = props;
            setSelection(prevState =>
              selection.some(({ key }) => key === item.key)
                ? prevState.filter(({ key }) => key !== item.key)
                : [...selection, { label: item.label, key: item.key }],
            );
          };

          return (
            <ListingFilter
              {...props}
              error={error}
              handleAccordionClick={handleAccordionClick}
              handleFilterSelect={handleFilterSelect}
              i={i}
              key={i}
              loading={loading}
              openIndexes={openIndexes}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
