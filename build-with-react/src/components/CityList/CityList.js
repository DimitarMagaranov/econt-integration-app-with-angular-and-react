import * as econtService from '../../services/econtService';
import { useEffect, useState } from 'react';
import OfficeList from '../OfficeList/OfficeList';

const CityList = ({setCity, selectedCity, setOffice}) => {
    const [cities, setCities] = useState({});

    useEffect(() => {
        econtService.getCities().then((data) => {
            setCities(() => data);
        });
    }, []);

    const onSelectCityHandler = (e) => {
        setCity(() => e.target.value);
    };

    

    return (
        <>
            <select onChange={onSelectCityHandler} name="city" type="text" placeholder="Select city">
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
