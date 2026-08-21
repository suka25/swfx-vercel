export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume?: number;
}

export const mockMarketData: MarketData[] = [
  {
    symbol: 'XAUUSD',
    price: 2045.32,
    change: 12.47,
    changePercent: 0.61,
    high: 2055.80,
    low: 2032.15,
  },
  {
    symbol: 'EURUSD',
    price: 1.0943,
    change: -0.0021,
    changePercent: -0.19,
    high: 1.0987,
    low: 1.0921,
  },
  {
    symbol: 'GBPUSD',
    price: 1.2718,
    change: 0.0034,
    changePercent: 0.27,
    high: 1.2764,
    low: 1.2682,
  },
  {
    symbol: 'USDJPY',
    price: 146.82,
    change: -0.54,
    changePercent: -0.37,
    high: 147.55,
    low: 146.31,
  },
  {
    symbol: 'AUDUSD',
    price: 0.6621,
    change: 0.0018,
    changePercent: 0.27,
    high: 0.6654,
    low: 0.6598,
  },
];
