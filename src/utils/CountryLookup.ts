import tr from "svg-country-flags/png100px/tr.png";
import it from "svg-country-flags/png100px/it.png";
import wal from "svg-country-flags/png100px/gb-wls.png";
import che from "svg-country-flags/png100px/ch.png";

import dk from "svg-country-flags/png100px/dk.png";
import fi from "svg-country-flags/png100px/fi.png";
import be from "svg-country-flags/png100px/be.png";
import ru from "svg-country-flags/png100px/ru.png";

import nl from "svg-country-flags/png100px/nl.png";
import ua from "svg-country-flags/png100px/ua.png";
import at from "svg-country-flags/png100px/at.png";
import mk from "svg-country-flags/png100px/mk.png";

import eng from "svg-country-flags/png100px/gb-eng.png";
import hr from "svg-country-flags/png100px/hr.png";
import sco from "svg-country-flags/png100px/gb-sct.png";
import cz from "svg-country-flags/png100px/cz.png";

import es from "svg-country-flags/png100px/es.png";
import pl from "svg-country-flags/png100px/pl.png";
import sk from "svg-country-flags/png100px/sk.png";
import se from "svg-country-flags/png100px/se.png";

import hu from "svg-country-flags/png100px/hu.png";
import pt from "svg-country-flags/png100px/pt.png";
import fr from "svg-country-flags/png100px/fr.png";
import de from "svg-country-flags/png100px/de.png";

export enum Country {
    Turkey = "TUR",
    Italy = "ITA",
    Wales = "WAL",
    Switzerland = "CHE",

    Denmark = "DNK",
    Finland = "FIN",
    Belgium = "BEL",
    Russia = "RUS",

    Netherlands = "NLD",
    Ukraine = "UKR",
    Austria = "AUT",
    NorthMacedonia = "MKD",

    England = "ENG",
    Croatia = "HRV",
    Scotland = "SCO",
    Czechia = "CZE",

    Spain = "ESP",
    Sweden = "SWE",
    Poland = "POL",
    Slovakia = "SVK",

    Hungary = "HUN",
    Portugal = "PRT",
    France = "FRA",
    Germany = "DEU"
}

export const Flags: any = {
    [Country.Turkey]: tr,
    [Country.Italy]: it,
    [Country.Wales]: wal,
    [Country.Switzerland]: che,

    [Country.Denmark]: dk,
    [Country.Finland]: fi,
    [Country.Belgium]: be,
    [Country.Russia]: ru,

    [Country.Netherlands]: nl,
    [Country.Ukraine]: ua,
    [Country.Austria]: at,
    [Country.NorthMacedonia]: mk,

    [Country.England]: eng,
    [Country.Croatia]: hr,
    [Country.Scotland]: sco,
    [Country.Czechia]: cz,

    [Country.Spain]: es,
    [Country.Sweden]: se,
    [Country.Poland]: pl,
    [Country.Slovakia]: sk,

    [Country.Hungary]: hu,
    [Country.Portugal]: pt,
    [Country.France]: fr,
    [Country.Germany]: de
};

export const CountryAlpha2: any = {
    "TUR": "TR",
    "ITA": "IT",
    "WAL": "GB-WLS",
    "CHE": "CH",
    "DNK": "DK",
    "FIN": "FI",
    "BEL": "BE",
    "RUS": "RU",
    "NLD": "NL",
    "UKR": "UA",
    "AUT": "AT",
    "MKD": "MK",
    "ENG": "GB-ENG",
    "HRV": "HR",
    "SCO": "GB-SCT",
    "CZE": "CZ",
    "ESP": "ES",
    "SWE": "SE",
    "POL": "PL",
    "SVK": "SK",
    "HUN": "HU",
    "PRT": "PT",
    "FRA": "FR",
    "DEU": "DE",

}

export const CountryLookup: any = {
    getFlag(code: string) {
        return Flags[code] ?? "";
    }
}
