export interface IMarketDescription {
    eventTypes: {
      eventTypeId: number;
      eventNodes: {
        eventId: number;
        event: {
          eventName: string;
          countryCode: string;
          timezone: string;
          venue: string;
          openDate: string;
        };
        marketNodes: {
          marketId: string;
          isMarketDataDelayed: boolean;
          state: {
            betDelay: 0;
            bspReconciled: boolean;
            complete: boolean;
            inplay: boolean;
            numberOfWinners: number;
            numberOfRunners: number;
            numberOfActiveRunners: number;
            lastMatchTime: string;
            totalMatched: number;
            totalAvailable: number;
            crossMatching: boolean;
            runnersVoidable: boolean;
            status: string;
          };
          description: {
            persistenceEnabled: boolean;
            bspMarket: boolean;
            marketName: string;
            marketTime: string;
            suspendTime: string;
            turnInPlayEnabled: boolean;
            marketType: string;
            regulator: string;
            raceNumber: string;
            raceType: string;
            bettingType: string;
          };
          rates: {
            marketBaseRate: number;
            discountAllowed: boolean;
          };
          runners: [
            {
              selectionId: 28664652;
              handicap: 0;
              description: {
                runnerName: string;
                metadata: {
                  SIRE_NAME: string;
                  CLOTH_NUMBER_ALPHA: string;
                  OFFICIAL_RATING: string;
                  COLOURS_DESCRIPTION: string;
                  COLOURS_FILENAME: string;
                  FORECASTPRICE_DENOMINATOR: string;
                  DAMSIRE_NAME: string;
                  WEIGHT_VALUE: string;
                  SEX_TYPE: string;
                  DAYS_SINCE_LAST_RUN: string;
                  WEARING: string;
                  OWNER_NAME: string;
                  DAM_YEAR_BORN: string;
                  SIRE_BRED: string;
                  JOCKEY_NAME: string;
                  DAM_BRED: string;
                  ADJUSTED_RATING: string;
                  runnerId: string;
                  CLOTH_NUMBER: string;
                  SIRE_YEAR_BORN: string;
                  TRAINER_NAME: string;
                  COLOUR_TYPE: string;
                  AGE: string;
                  DAMSIRE_BRED: string;
                  JOCKEY_CLAIM: string;
                  FORM: string;
                  FORECASTPRICE_NUMERATOR: string;
                  BRED: string;
                  DAM_NAME: string;
                  DAMSIRE_YEAR_BORN: string;
                  STALL_DRAW: string;
                  WEIGHT_UNITS: string;
                };
              };
              state: {
                adjustmentFactor: number;
                sortPriority: number;
                lastPriceTraded: number;
                totalMatched: number;
                status: string;
              };
            }
          ];
          isMarketDataVirtual: false;
        };
      };
    };
  }
  