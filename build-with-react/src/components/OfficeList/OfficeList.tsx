import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IOffice } from "../../interfaces/office";
import { IOfficeList } from "../../interfaces/officeList";

import * as econtService from '../../services/econtService';

type OfficeListProps = {
    selectedCity: Number,
    setOffice: Dispatch<SetStateAction<IOffice>>
};


const OfficeList = ({selectedCity, setOffice}: OfficeListProps) => {
    const [offices, setOffices] = useState<IOfficeList>({offices: []});

    useEffect(() => {
        if (selectedCity != 0) {
            econtService.getOffices(selectedCity).then((data) => {
                setOffices(() => data);
            });
        }
    }, [selectedCity]);

    const onSelectOfficeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const office = offices.offices.find((x) => x.id == Number(e.target.value))!;
        setOffice(() => office);
    };

    return (
        <>
            {selectedCity != 0 && (
                <select onChange={onSelectOfficeHandler} name="office">
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
