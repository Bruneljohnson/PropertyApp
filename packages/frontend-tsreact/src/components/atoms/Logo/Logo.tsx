import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import logoImage from "../../../assets/PropertyApp.png";
import { PAGE_URLS } from '../../../config'

const imageSize = 50;
export const Logo = (): JSX.Element  => {
  return (
    <Box component={Link} to={PAGE_URLS.listings} sx={{ display: "flex" }}>
            <Box component="img" width={200} alt="company logo" minHeight={imageSize}
        minWidth={imageSize}
        maxHeight={imageSize}
        maxWidth={imageSize}
        borderRadius={0.75}
        sx={{ objectFit: "cover" }}
        src={logoImage} />
      <title>PropertyApp logo</title>
    </Box>
    
  )
}