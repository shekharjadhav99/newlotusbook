export interface IRaces {
    countryCode: string;
    eventTypeId: number;
    meetingId: number;
    races: {
      [key: number]: {
        inplay: number;
        marketId: string;
        marketName: string;
        open: number;
        port: number;
        startTime: string;
      };
    };
    venue: string;
  }
  
  export interface IRace {
    inplay: number;
    marketId: string;
    marketName: string;
    open: number;
    port: number;
    startTime: string;
  }
  