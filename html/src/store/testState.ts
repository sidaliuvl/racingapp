import { BaseData } from './types'

export const testState = {
  appIsOpen: true,
  hudIsOpen: false,
  currentPage: 'racing',
  currentTab: 'current',
  showOnlyCurated: true,
  activeRace: {},
  activeHudData: {},
  countdown: -1,
  buttons: {},
  creatorData: {},
  baseData: {
    data: {
      classes: [
        { value: 'D', text: 'D', number: 0 },
        { value: 'C', text: 'C', number: 1 },
        { value: 'B', text: 'B', number: 2 },
        { value: 'A', text: 'A', number: 3 },
        { value: 'S', text: 'S', number: 4 }
      ],
      laps: [
        { value: 0, text: 'Sprint' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: -1, text: 'Elimination' }
      ],
      buyIns: [
        { value: 0, text: '$0' },
        { value: 250, text: '$250' },
        { value: 500, text: '$500' },
        { value: 1000, text: '$1000' }
      ],
      participationCurrencyOptions: [
        { value: 'money', text: 'Money' },
        { value: 'racingcrypto', text: 'Racing Crypto' }
      ],
      moneyType: 'money',
      cryptoType: 'RC',
      ghostingEnabled: true,
      ghostingTimes: [
        { value: -1, text: 'Off' },
        { value: 0, text: 'Always' },
        { value: 10, text: '10s' },
        { value: 20, text: '20s' }
      ],
      allowShare: true,
      racerNames: [
        { racername: 'Test Racer', revoked: false }
      ],
      currentRacerName: 'Test Racer',
      currentRacerAuth: 'admin',
      currentCrewName: 'Test Crew',
      currentCrypto: 1000,
      currentRanking: 1500,
      cryptoConversionRate: 100,
      allowBuyingCrypto: true,
      allowSellingCrypto: true,
      allowTransferCrypto: true,
      sellCharge: 0.1,
      auth: {
        join: true,
        records: true,
        setup: true,
        create: true,
        control: true,
        controlAll: true,
        createCrew: true,
        startRanked: true,
        startElimination: true,
        startReversed: true,
        setupParticipation: true,
        curateTracks: true,
        handleBounties: true,
        cancelAll: true,
        startAll: true
      },
      hudSettings: {
        location: 'split',
        maxPositions: 10
      },
      translations: {
        'racing': 'Racing',
        'results': 'Results',
        'crew': 'Crew',
        'my_tracks': 'My Tracks',
        'racers': 'Racers',
        'settings': 'Settings',
        'user': 'User',
        'auth': 'Auth',
        'rank': 'Rank',
        'no_data': 'No data available'
      },
      anyoneCanCreate: true,
      isFirstUser: false,
      isUsingRacingCrypto: true,
      payments: {
        useRacingCrypto: 'racingcrypto',
        cryptoType: 'RC',
        racing: 'racingcrypto',
        automationPayout: 'racingcrypto',
        participationPayout: 'racingcrypto',
        bountyPayout: 'racingcrypto',
        createRacingUser: 'racingcrypto',
        crypto: 'racingcrypto'
      },
      hideMap: false
    }
  },
  isLoadingBaseData: false,
  settings: {},
  tracks: [
    {
      Access: { race: '' },
      Checkpoints: [
        {
          coords: { x: 100, y: 100, z: 100 },
          offset: {
            left: { x: 90, y: 90, z: 100 },
            right: { x: 110, y: 110, z: 100 }
          }
        }
      ],
      Creator: 'test',
      CreatorName: 'Test Racer',
      Curated: 1,
      Distance: 1000,
      LastLeaderboard: [],
      NumStarted: 0,
      RaceId: 'test-race-1',
      RaceName: 'Test Race 1',
      Racers: [],
      Records: [],
      Started: false,
      Waiting: false,
      Metadata: {
        description: 'A test race track',
        raceType: 'circuit_only'
      }
    }
  ],
  results: {},
  myCrew: {
    id: 1,
    crewName: 'Test Crew',
    founderName: 'Test Racer',
    founderCitizenid: 'TEST1',
    members: [
      {
        citizenID: 'TEST1',
        racername: 'Test Racer',
        rank: 1500
      }
    ],
    wins: 10,
    races: 20,
    rank: 1
  },
  notification: undefined,
  bounties: [
    {
      id: 'test-bounty-1',
      trackId: 'test-race-1',
      maxClass: 'S',
      reversed: false,
      timeToBeat: 60000,
      extraTime: 5000,
      price: '1000',
      rankRequired: 1000,
      sprint: false,
      trackName: 'Test Race 1',
      claimed: {}
    }
  ],
  showCryptoModal: false
}