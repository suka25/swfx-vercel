import { NextResponse } from 'next/server';

// Fallback data jika API gagal
const fallbackData = [
  { pair: 'XAUUSD', price: '2045.32', change: '+0.61%', direction: 'up' },
  { pair: 'EURUSD', price: '1.0943', change: '-0.19%', direction: 'down' },
  { pair: 'GBPUSD', price: '1.2718', change: '+0.27%', direction: 'up' },
  { pair: 'USDJPY', price: '146.82', change: '-0.37%', direction: 'down' },
  { pair: 'AUDUSD', price: '0.6584', change: '+0.15%', direction: 'up' },
  { pair: 'BTCUSD', price: '43250', change: '+1.20%', direction: 'up' },
];

// Fungsi untuk fetch harga dari berbagai sumber
async function fetchPrice(symbol: string): Promise<{ price: number; change: number } | null> {
  try {
    // Sumber 1: Twelve Data (free tier)
    const apiKey = process.env.TWELVE_DATA_API_KEY || 'demo';
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
    
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.price) {
        return { price: parseFloat(data.price), change: 0 };
      }
    }
    
    // Sumber 2: CoinGecko untuk crypto
    if (symbol === 'BTCUSD') {
      const cryptoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true';
      const cryptoRes = await fetch(cryptoUrl, { next: { revalidate: 60 } });
      if (cryptoRes.ok) {
        const cryptoData = await cryptoRes.json();
        if (cryptoData.bitcoin) {
          return { 
            price: cryptoData.bitcoin.usd, 
            change: cryptoData.bitcoin.usd_24h_change || 0 
          };
        }
      }
    }

    // Sumber 3: Yahoo Finance (via query1)
    if (symbol === 'XAUUSD' || symbol === 'EURUSD' || symbol === 'GBPUSD' || symbol === 'USDJPY' || symbol === 'AUDUSD') {
      const yahooSymbol = symbol === 'XAUUSD' ? 'GC=F' : 
                         symbol === 'EURUSD' ? 'EURUSD=X' :
                         symbol === 'GBPUSD' ? 'GBPUSD=X' :
                         symbol === 'USDJPY' ? 'JPY=X' :
                         symbol === 'AUDUSD' ? 'AUDUSD=X' : symbol;
      
      const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?interval=1d&range=1d`;
      const yahooRes = await fetch(yahooUrl, { 
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      if (yahooRes.ok) {
        const yahooData = await yahooRes.json();
        const result = yahooData?.chart?.result?.[0];
        if (result?.meta?.regularMarketPrice) {
          const price = result.meta.regularMarketPrice;
          const previousClose = result.meta.previousClose || price;
          const change = ((price - previousClose) / previousClose) * 100;
          return { price, change };
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

// Fungsi untuk menghitung pivot points
function calculatePivotPoints(high: number, low: number, close: number) {
  const pivot = (high + low + close) / 3;
  const r1 = (2 * pivot) - low;
  const r2 = pivot + (high - low);
  const r3 = high + 2 * (pivot - low);
  const s1 = (2 * pivot) - high;
  const s2 = pivot - (high - low);
  const s3 = low - 2 * (high - pivot);
  
  return {
    pivot: pivot.toFixed(4),
    r1: r1.toFixed(4),
    r2: r2.toFixed(4),
    r3: r3.toFixed(4),
    s1: s1.toFixed(4),
    s2: s2.toFixed(4),
    s3: s3.toFixed(4),
  };
}

export async function GET() {
  try {
    const symbols = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'BTCUSD'];
    const marketData = [];
    const pivotData: any = {};

    // Fetch data untuk setiap symbol
    for (const symbol of symbols) {
      const data = await fetchPrice(symbol);
      if (data) {
        const changePercent = data.change || 0;
        marketData.push({
          pair: symbol,
          price: data.price.toFixed(symbol === 'BTCUSD' ? 0 : symbol === 'USDJPY' ? 3 : 4),
          change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
          direction: changePercent >= 0 ? 'up' : 'down',
        });

        // Simulasi OHLC untuk pivot (akan lebih akurat dengan API OHLC)
        const price = data.price;
        const high = price * (1 + Math.random() * 0.005);
        const low = price * (1 - Math.random() * 0.005);
        const close = price;
        
        pivotData[symbol] = calculatePivotPoints(high, low, close);
      }
    }

    // Jika tidak ada data, gunakan fallback
    if (marketData.length === 0) {
      return NextResponse.json({
        success: true,
        data: fallbackData,
        pivotData: {},
        source: 'fallback'
      });
    }

    return NextResponse.json({
      success: true,
      data: marketData,
      pivotData: pivotData,
      source: 'api',
      lastUpdated: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Market API error:', error);
    return NextResponse.json({
      success: true,
      data: fallbackData,
      pivotData: {},
      source: 'fallback',
      error: error.message
    });
  }
}
