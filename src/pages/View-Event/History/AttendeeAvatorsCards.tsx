import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

interface AttendeesProps {
    id: number,
    attendName: string,
}

const BoxesWithAvatars: React.FC<{ attendeesNames: AttendeesProps[] }> = ({ attendeesNames }) => {
    return (
        <Grid container spacing={2}>
            {attendeesNames.map((attendee, index) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
                    <Box
                        minHeight={82}
                        width={167.39}
                        borderRadius={5}
                        bgcolor="#FBFBFB"
                        padding={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack direction="column" alignItems="center" spacing={1}>
                            <Avatar
                                alt={`User`}
                                src={`quality=75&auto=webp/${index + 1}.jpg`}
                            />
                            <Typography variant="body2" align="center">
                                {attendee.attendName}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default BoxesWithAvatars;
