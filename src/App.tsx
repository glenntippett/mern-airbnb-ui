import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const LISTINGS = gql`
  query GetListings($offset: Int, $limit: Int) {
    getAllListings(offset: $offset, limit: $limit) {
      name
      summary
    }
  }
`;

const App = () => {
  const [limit, setLimit ] = useState(2);
  const { loading, error, data, fetchMore } = useQuery(LISTINGS, {
    variables: { offset: 0, limit },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      { data.getAllListings.map((listing: any) => (
        <div key={listing.name}>
          <strong>{listing.name}</strong>
          <p>{listing.summary}</p>
        </div>
      ))}
      <button onClick={ () => {
        const currentLength = data.getAllListings.length;
        fetchMore({
          variables: {
            offset: currentLength,
            limit: 2
          }
        }).then(fetchMoreResult => {
          setLimit(currentLength + fetchMoreResult.data.getAllListings.length);
        })
      }}>
        Load more...
      </button>
    </div>
  )
}

export default App;
