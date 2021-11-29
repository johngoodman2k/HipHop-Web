
import EyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link as RouterLink } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Chip } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
//
import SvgIconStyle from '../../utils/SvgIconStyle';

import PostMoreMenu from './PostMoreMenu'

// ----------------------------------------------------------------------


const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));



const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const PostMenu = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 9,
  right: theme.spacing(1),
  bottom: theme.spacing(-9),
}));



// ----------------------------------------------------------------------


export default function PostCard({ post, index }) {
  const { cover, title, view, comment, author, createdAt } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const handleDelete = () => {
    console.log('delete')
  }

  const POST_INFO = [
    { number: comment, icon: MessageIcon  },
    { number: view, icon: EyeIcon  },
  ];

  const POST_STATUS = [
    { chip: <Chip color="success" label="Pass" sx={{marginRight: '0.1rem', marginTop:'5px'}}/> },
    { chip: <Chip color="secondary" label="Private" sx={{marginRight: '0.1rem', marginTop:'5px'}}/>  },
    {chip: <Chip color="error" label="Banned" sx={{marginRight: '0.1rem' , marginTop:'5px'}}/>},
    {chip: <Chip color="warning" label="Hot" onDelete={handleDelete} sx={{marginRight: '0.1rem', marginTop:'5px'}}/>}
                                                       
  ];

  

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          <PostMenu sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                right: 24,
                width: 40,
                height: 40
              })
            }}>
            <PostMoreMenu></PostMoreMenu>
          </PostMenu>

          <CoverImgStyle alt={title} src={cover} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>

          <InfoStyle>
            <Box sx={{color:'grey.500', marginBottom: '5px'}}>
              Status
            </Box>
            
          </InfoStyle>

          <div className="kzStatusBox">
            
              <Grid 
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
              {POST_STATUS.map((status, index) => (
                  status.chip
              ))}
              </Grid>
  
          </div>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                
                <Box component={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} ></Box>
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
