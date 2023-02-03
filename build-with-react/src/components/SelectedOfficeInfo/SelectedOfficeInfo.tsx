import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { IOffice } from '../../interfaces/office';
import { loadOfficeWorkingTime } from '../../utils/dateToString';

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
