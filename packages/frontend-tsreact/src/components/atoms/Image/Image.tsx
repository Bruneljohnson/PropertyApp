import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import { PAGE_URLS } from '../../../config'
import  { type ImageProps } from './Image.type';

export const Image = ({image,imageSizeNo,alt}:ImageProps): JSX.Element  => {
  const imageSize = imageSizeNo;
  return (
    <Box component={Link} to={PAGE_URLS.listings} sx={{ display: "flex" }}>
            <Box component="img" width="100%" alt={alt} minHeight={imageSize/2}
        minWidth={imageSize/2}
        maxHeight={imageSize}
        maxWidth={imageSize}
        borderRadius={0.75}
        sx={{ objectFit: "cover" }}
        src={image} />
      <title>{alt}</title>
    </Box>
    
  )
}