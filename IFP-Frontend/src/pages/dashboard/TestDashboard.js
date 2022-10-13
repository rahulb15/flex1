import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NestedGrid() {
  return (
    <>
    <Box sx={{ flexGrow: 1, width: '20%', height: '20%', position: 'relative' }}>
        <Typography variant="h6" gutterBottom component="div">
            Nested Grid
        </Typography>
    </Box>

    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} sx={{ width: '150%', height: '300%' }} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={10}>
                <Grid container spacing={1} direction="column">
                    <Grid item xs={2} sx={{height: '100%' }}>
                        <Item 
                            sx={{
                                width: '95%',
                                height: '90%',
                                position: 'relative',
                                backgroundColor: 'blue',
                            }}
                        >
                            <Typography variant="h6" gutterBottom component="div">
                                2
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item 
                            sx={{
                                width: '75%',
                                height: '400%',
                                position: 'relative',
                                backgroundColor: 'green',
                            }}
                        >
                            <Typography variant="h6" gutterBottom component="div">
                                2
                            </Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item 
                            sx={{
                                width: '75%',
                                height: '400%',
                                position: 'relative',
                                backgroundColor: 'green',
                            }}
                        >
                            <Typography variant="h6" gutterBottom component="div">
                                2
                            </Typography>

                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item 
                            sx={{
                                width: '75%',
                                height: '400%',
                                position: 'relative',
                                backgroundColor: 'green',
                            }}
                        >
                            <Typography variant="h6" gutterBottom component="div">
                                2
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    </>
  );
}