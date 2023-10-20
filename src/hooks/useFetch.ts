import { Shortlink } from '@/types/shortlink.types'
import React, { useCallback } from 'react'

function useFetch(api: string) {
  const [data, setData] = React.useState({
    data: null,
    loading: true,
    error: false,
  } as {
    data: Shortlink[] | null,
    loading: boolean,
    error: boolean,
  })

  const fetchData = useCallback(async () => {
    try {
        const res = await fetch(api)
        const json = await res.json()
        setData({
            data: json as Shortlink[],
            loading: false,
            error: false,
        })
    }catch {
        setData({
            data: null,
            loading: false,
            error: true,
        })
    }
  },[])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const revalidate = useCallback(() => {
        fetchData()
    }, [fetchData])

    return [data, {
        revalidate
    }] as [
        typeof data,
        {
            revalidate: () => void
        }
    ]
}

export default useFetch
