import InfoIcon from "@mui/icons-material/Info";
import { Box, Tooltip, Typography } from "@mui/material";

import { type FormFieldProps } from "./FormLabel.type";

export const FormLabel = ({ label, required, info }: FormFieldProps): JSX.Element => (
  <Box display="flex" flexDirection="column">
    <Typography mb={1}>
      {label}
      {required && (
        <>
          &nbsp;
          <Box component="span" color="error.main">
            *
          </Box>
        </>
      )}

      {info && (
        <Box component="span">
          <Tooltip
            title="Information about this field is here"
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "common.white",
                  p: 2,
                  fontSize: "16px",
                  fontWeight: "400",
                  borderStyle: "solid",
                  borderColor: "grey.300",
                  borderWidth: "1px",
                  color: "grey.800",
                  "& .MuiTooltip-arrow": {
                    color: "common.white",
                    height: "1.05em",
                    width: "1.5em",
                    "&:before": {
                      borderStyle: "solid",
                      borderColor: "grey.300",
                      borderWidth: "1px",
                      transform: "rotate(45deg)",
                      marginTop: "6px",
                      borderTop: "none",
                    },
                  },
                },
              },
            }}
            arrow
          >
            <InfoIcon sx={{ mb: -1, ml: 1, color: "grey.500" }} />
          </Tooltip>
        </Box>
      )}
    </Typography>
  </Box>
);
