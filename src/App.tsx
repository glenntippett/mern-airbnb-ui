import { useQuery, gql } from "@apollo/client"
import { useState } from "react"
import ListingCard from "./components/ListingCard"

const LISTINGS = gql`
  query GetListings($offset: Int, $limit: Int) {
    getAllListings(offset: $offset, limit: $limit) {
      name
      summary
      address {
        street
        suburb
        country
      }
      images {
        medium_url
        picture_url
      }
    }
  }
`

const App = () => {
  const [limit, setLimit ] = useState(2)
  const [searchFilter, setSearchFilter] = useState('')
  const { loading, error, data, fetchMore } = useQuery(LISTINGS, {
    variables: { offset: 0, limit },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const handleSearch = () => {
    console.log(`Searching for ${searchFilter}`)
  }

  return (
    <section>
      <input
        type="text"
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      <button onClick={() => handleSearch()}>
        Search
      </button>

      { data && data.getAllListings.map((listing: any) => (
        <ListingCard listing={listing} />
      ))}
      <button onClick={ () => {
        const currentLength = data.getAllListings.length
        fetchMore({
          variables: {
            offset: currentLength,
            limit: 2
          }
        }).then(fetchMoreResult => {
          setLimit(currentLength + fetchMoreResult.data.getAllListings.length)
        })
      }}>
        Load more...
      </button>
    </section>
  )
}

export default App
