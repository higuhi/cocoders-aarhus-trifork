import { useState, useMemo, useCallback } from "react";
import Select from "react-select";
import { Radio } from  "react-loader-spinner";
import { registerLocale, getNames, getAlpha2Code } from "i18n-iso-countries";
import CountryLocaleData from "i18n-iso-countries/langs/en.json";
import "./App.css";

type CountryOption = { label: string, value: string }


export default () => {
    const [confirmed, setConfirmed] = useState<string|undefined>();
    const [population, setPopulation] = useState<string|undefined>();
    const [errorMsg, setErrorMsg] = useState<string|undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const countryOptions = useMemo(() => {
        registerLocale(CountryLocaleData);

        const sortedCountryNames = Object.values(getNames("en", {select: "official"})).sort();
        return sortedCountryNames.map<CountryOption>((countryName) => {
            const countryCode = getAlpha2Code(countryName, "en");
            return {label: countryName, value: countryCode};
        });
    }, []);

    const onChange = useCallback(async (option: CountryOption | null) => {
        setLoading(true);
        setErrorMsg(undefined);
        setConfirmed(undefined);
        setPopulation(undefined);    

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + "/" + option?.value || "", {
                method: "GET",
            });
            
            const data = await response.json();
            
            if (response.ok) {
                const { All: {confirmed = undefined, population = undefined} = {} } = data;
                if (!confirmed || !population) {
                    setErrorMsg("The selected country is not supported");
                } else {
                    setConfirmed(confirmed);
                    setPopulation(population);
                }
            } else {
                const { message = undefined } = data;
                setErrorMsg(message || `Request failed (HTTP ${response.status} Error). Please try again.`);
            }
                
        } catch (error: any) {
            setErrorMsg((error.hasOwnProperty("message") ? error.message : error) || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }

    },[]);


    return (
        <div className="App">
            <div className="loader"> <Radio visible={isLoading} /> </div>
            <Select className="select_country" options={countryOptions} onChange={onChange} isDisabled={isLoading}/>
            <div className="content">
                {confirmed ? <div className="content_confirmed">Confirmed cases: <span>{confirmed.toLocaleString()}</span></div> : null}
                {population ? <div className="content_population">Population: <span>{population.toLocaleString()}</span></div> : null}
            </div>
            {errorMsg ? <div className="content_error">{errorMsg}</div> : null} 
        </div>
    );
};
