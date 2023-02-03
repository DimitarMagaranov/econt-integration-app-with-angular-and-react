import { useEffect, useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IOffice } from "../../interfaces/office";
import { IOfficeList } from "../../interfaces/officeList";

import * as econtService from '../../services/econtService';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

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

    const onSelectOfficeHandler = (e: any) => {
        const office = offices.offices.find((x) => x.id == Number(e.target.value))!;
        setOffice(() => office);
    };

    return (
        <>
            {selectedCity != 0 && (
                <FormControl sx={{maxWidth: 1024}}>
                <InputLabel id="office-select">Office</InputLabel>
                <Select
                    labelId="office-select"
                    label="office"
                    onChange={onSelectOfficeHandler}
                >
                    {offices.offices?.map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                        {x.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            )}
        </>
    );
};

export default OfficeList;
