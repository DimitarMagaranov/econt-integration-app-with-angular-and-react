import { loadOfficeWorkingTime } from '../../utils/dateToString';

const SelectedOfficeInfo = ({selectedOffice}) => {
    return (
        <>
            {selectedOffice && (
                <div className="office-details-ctr">
                    <h4>Office: {selectedOffice.nameEn}</h4>
                    <p>{selectedOffice.address?.fullAddressEn}</p>
                    <p>{loadOfficeWorkingTime(selectedOffice).mondayToFriday}</p>
                    <p>{loadOfficeWorkingTime(selectedOffice).saturday}</p>
                    <p>{selectedOffice.code}</p>
                </div>
            )}
        </>
    );
};

export default SelectedOfficeInfo;
