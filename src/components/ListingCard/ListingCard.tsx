type Address = {
  street: string
  suburb: string
  country: string
}

type Listing = {
  name: string
  summary: string
  address: Address
}

type ListingCardProps = {
  listing: Listing
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <article key={listing.name}>
      <h3>{listing.name}</h3>
      <p style={{ textDecoration: 'underline' }}>{listing.address?.country}</p>
      <p>{listing.summary}</p>
    </article>
  )
}
