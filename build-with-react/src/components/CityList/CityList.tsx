import * as econtService from '../../services/econtService';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import OfficeList from '../OfficeList/OfficeList';
import { IOffice } from '../../interfaces/office';
import { ICity } from '../../interfaces/city';
import { ICityList } from '../../interfaces/cityList';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

type CityListProps = {
    setCity: Dispatch<SetStateAction<number>>;
};

const CityList = ({ setCity }: CityListProps) => {
    const [cities, setCities] = useState<ICityList>({ cities: [] });

    useEffect(() => {
        econtService.getCities().then((data) => {
            setCities(() => data);
        });
    }, []);

    const onSelectCityHandler = (e: any) => {
        setCity(() => Number(e.target.value));
    };

    return (
        <>
            <FormControl>
                <InputLabel id="city-select">City</InputLabel>
                <Select
                    labelId="city-select"
                    label="City"
                    onChange={onSelectCityHandler}
                >
                    {cities.cities?.map((x) => (
                    <MenuItem key={x.id} value={x.id}>
                        {x.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </>
    );
};

export default CityList;
