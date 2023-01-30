import * as econtService from '../../services/econtService';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import OfficeList from '../OfficeList/OfficeList';
import { IOffice } from '../../interfaces/office';
import { ICity } from '../../interfaces/city';
import { ICityList } from '../../interfaces/cityList';

type CityListProps = {
    setCity: Dispatch<SetStateAction<number>>,
    selectedCity: Number,
    setOffice: Dispatch<SetStateAction<IOffice>>
};

const CityList = ({setCity, selectedCity, setOffice}: CityListProps) => {
    const [cities, setCities] = useState<ICityList>({cities: []});

    useEffect(() => {
        econtService.getCities().then((data) => {
            setCities(() => data);
        });
    }, []);

    const onSelectCityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setCity(() => Number(e.target.value));
    };

    

    return (
        <>
            <select onChange={onSelectCityHandler} name="city" placeholder="Select city">
                {cities.cities?.map((x) => (
                    <option key={x.id} value={x.id}>
                        {x.name}
                    </option>
                ))}
            </select>
            <OfficeList setOffice={setOffice} selectedCity={selectedCity}/>
        </>
    );
};

export default CityList;
