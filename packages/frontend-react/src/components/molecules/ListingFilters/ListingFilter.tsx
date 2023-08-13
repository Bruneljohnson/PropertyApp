import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";

import { ListingFilterChips } from "../../atoms/ListingFilterChips";
import { type ListingFilterProps } from "./ListingFilters.type";

export const ListingFilter = ({
  error,
  handleAccordionClick,
  handleFilterSelect,
  i,
  loading,
  openIndexes,
  options,
  resetSelection,
  selection,
  title,
}: ListingFilterProps): JSX.Element => {
  // logic here to detect overflows and manage show more etc

  return (
    <Accordion
      expanded={openIndexes.includes(i)}
      onChange={() => {
        handleAccordionClick(i);
      }}
      key={i}
      disableGutters
      elevation={0}
      square
      sx={{
        "&::before": {
          content: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          borderBottom: 1,
          borderTop: 0,
          borderColor: "grey.300",
          px: 0,
          pb: 1,
        }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 0,
          mt: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ListingFilterChips
          error={error}
          items={options}
          loading={loading}
          selection={selection.map(({ key }) => key)}
          setSelection={handleFilterSelect}
        />

        <Button
          disabled={selection.length === 0}
          size="small"
          sx={{ mr: "auto", mt: 1 }}
          onClick={() => {
            resetSelection();
          }}
        >
          Reset
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
