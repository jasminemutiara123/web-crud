'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const [user, setUser] = useState(null)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const getUserAndData = async () => {
      // ambil user login
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      // ambil data pivot
      let { data: tableData } = await supabase.from('data').select('*')
      const pivot = {}
      tableData.forEach(item => {
        pivot[item.nama] = (pivot[item.nama] || 0) + 1
      })

      setChartData({
        labels: Object.keys(pivot),
        datasets: [
          {
            label: 'Jumlah Data',
            data: Object.values(pivot),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      })
    }

    getUserAndData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Home Dashboard</h1>
      <h3>Welcome, {user?.email}</h3>

      <h2>Pivot Chart</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  )
}