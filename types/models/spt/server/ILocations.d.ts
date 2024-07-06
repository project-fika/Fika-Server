import { ILocation } from "@spt/models/eft/common/ILocation";
import { ILocationsBase } from "@spt/models/eft/common/tables/ILocationsBase";
export interface ILocations {
    bigmap?: ILocation;
    develop?: ILocation;
    factory4_day?: ILocation;
    factory4_night?: ILocation;
    hideout?: ILocation;
    interchange?: ILocation;
    laboratory?: ILocation;
    lighthouse?: ILocation;
    privatearea?: ILocation;
    rezervbase?: ILocation;
    shoreline?: ILocation;
    suburbs?: ILocation;
    tarkovstreets?: ILocation;
    terminal?: ILocation;
    town?: ILocation;
    woods?: ILocation;
    sandbox?: ILocation;
    sandbox_high?: ILocation;
    /** Holds a mapping of the linkages between locations on the UI */
    base?: ILocationsBase;
}
