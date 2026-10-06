const createId = () => 'estimate-' + Date.now() + '-' + Math.random().toString(16).slice(2)

export const starterEstimates = [
  {
    id: 'website-refresh',
    title: 'Website refresh',
    client: 'Northstar Studio',
    description: 'A faster, clearer home for the new product line.',
    currency: 'USD',
    expenses: 240,
    contingency: 10,
    margin: 30,
    tax: 0,
    updatedAt: '2026-10-06T10:00:00.000Z',
    items: [
      { id: 'website-1', phase: 'Plan', work: 'Discovery and direction', hours: 8, rate: 95 },
      { id: 'website-2', phase: 'Design', work: 'Page layouts and visual system', hours: 22, rate: 95 },
      { id: 'website-3', phase: 'Build', work: 'Responsive website development', hours: 36, rate: 110 },
      { id: 'website-4', phase: 'Review', work: 'Testing and launch support', hours: 10, rate: 85 },
    ],
  },
  {
    id: 'mobile-app-pilot',
    title: 'Mobile app pilot',
    client: 'Fieldwork Co.',
    description: 'A focused pilot to validate the field reporting flow.',
    currency: 'EUR',
    expenses: 520,
    contingency: 12,
    margin: 28,
    tax: 0,
    updatedAt: '2026-10-05T14:30:00.000Z',
    items: [
      { id: 'mobile-1', phase: 'Plan', work: 'Product mapping', hours: 12, rate: 90 },
      { id: 'mobile-2', phase: 'Design', work: 'Prototype and interface design', hours: 24, rate: 95 },
      { id: 'mobile-3', phase: 'Build', work: 'Mobile app pilot build', hours: 52, rate: 115 },
    ],
  },
  {
    id: 'store-launch',
    title: 'Store launch campaign',
    client: 'Cedar & Coast',
    description: 'A launch kit for the first flagship location.',
    currency: 'GBP',
    expenses: 310,
    contingency: 8,
    margin: 25,
    tax: 0,
    updatedAt: '2026-10-03T09:15:00.000Z',
    items: [
      { id: 'store-1', phase: 'Plan', work: 'Launch campaign plan', hours: 10, rate: 78 },
      { id: 'store-2', phase: 'Design', work: 'Print and digital assets', hours: 28, rate: 88 },
      { id: 'store-3', phase: 'Build', work: 'Landing page and launch support', hours: 18, rate: 98 },
    ],
  },
]

export const createEstimate = () => ({
  id: createId(),
  title: 'Untitled estimate',
  client: '',
  description: '',
  currency: 'USD',
  expenses: 0,
  contingency: 10,
  margin: 25,
  tax: 0,
  updatedAt: new Date().toISOString(),
  items: [
    {
      id: createId(),
      phase: 'Plan',
      work: '',
      hours: 1,
      rate: 75,
    },
  ],
})

export const calculateEstimate = (estimate) => {
  const hours = estimate.items.reduce((sum, item) => sum + (Number(item.hours) || 0), 0)
  const labor = estimate.items.reduce(
    (sum, item) => sum + (Number(item.hours) || 0) * (Number(item.rate) || 0),
    0,
  )
  const expenses = Number(estimate.expenses) || 0
  const contingency = (labor + expenses) * ((Number(estimate.contingency) || 0) / 100)
  const cost = labor + expenses + contingency
  const marginRate = Math.min(Number(estimate.margin) || 0, 99)
  const subtotal = marginRate ? cost / (1 - marginRate / 100) : cost
  const margin = subtotal - cost
  const tax = subtotal * ((Number(estimate.tax) || 0) / 100)

  return {
    hours,
    days: Math.ceil(hours / 6),
    labor,
    expenses,
    contingency,
    cost,
    margin,
    subtotal,
    tax,
    total: subtotal + tax,
  }
}

export const formatMoney = (amount, currency = 'USD') => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0)
  } catch {
    return currency + ' ' + Math.round(Number(amount) || 0)
  }
}

export const formatDate = (date) => new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
}).format(new Date(date))

export const loadEstimates = () => {
  try {
    const stored = window.localStorage.getItem('scopecraft-estimates')
    const parsed = stored ? JSON.parse(stored) : null
    if (Array.isArray(parsed)) return parsed
  } catch {
    return starterEstimates
  }

  return starterEstimates
}

export const saveEstimates = (estimates) => {
  try {
    window.localStorage.setItem('scopecraft-estimates', JSON.stringify(estimates))
  } catch {
    return false
  }

  return true
}