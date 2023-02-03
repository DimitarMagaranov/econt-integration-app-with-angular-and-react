import { useEffect } from 'react';
import { IOffice } from '../../interfaces/office';
import { loadOfficeWorkingTime } from '../../utils/dateToString';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SelectedOfficeInfo = ({ selectedOffice }: { selectedOffice: IOffice }) => {
    return (
        <>
            {selectedOffice.name && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Office: {selectedOffice.nameEn}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {selectedOffice.address?.fullAddressEn}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loadOfficeWorkingTime(selectedOffice).mondayToFriday}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {loadOfficeWorkingTime(selectedOffice).saturday}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">View on the map</Button>
                    </CardActions> */}
                </Card>
            )}
        </>
    );
};

export default SelectedOfficeInfo;
