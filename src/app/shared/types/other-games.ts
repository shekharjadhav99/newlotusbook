export interface IOtherGames {
    meetings: {
      countryCode: string;
      eventTypeId: number;
      meetingGoing: boolean;
      meetingId: number;
      name: string;
      openDate: string;
      races: {
        inplay: false;
        marketId: string;
        marketName: string;
        raceId: string;
        raceNumber: number;
        result: boolean;
        startTime: string;
        status: string;
      }[];
      venue: string;
    }[];
    countryCodes: string[];
  }
  