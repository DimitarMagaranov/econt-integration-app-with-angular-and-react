import { useEffect, useState } from "react";

import * as econtService from '../../services/econtService';


const OfficeList = ({selectedCity, setOffice}) => {
    const [offices, setOffices] = useState({});

    useEffect(() => {
        if (selectedCity != 0) {
            econtService.getOffices(selectedCity).then((data) => {
                setOffices(() => data);
            });
        }
    }, [selectedCity]);

    const onSelectOfficeHandler = (e) => {
        setOffice(() => offices.offices.find((x) => x.id == e.target.value));
    };

    return (
        <>
            {selectedCity != 0 && (
                <select onChange={onSelectOfficeHandler} name="office" type="text">
                    {offices.offices?.map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.name}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
};

export default OfficeList;
