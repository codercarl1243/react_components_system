
export default function Octagons() {

  return (
    <div className="octagon--cluster">
      <svg className="octagon octagon__small octagon--cluster__top" viewBox="0 0 200 200">
        <polygon points="100,10 165,35 190,100 165,165 100,190 35,165 10,100 35,35"
          fill="var(--color-secondary-100)" />
      </svg>

      <svg className="octagon octagon__large" viewBox="0 0 200 200">
        <polygon points="100,10 165,35 190,100 165,165 100,190 35,165 10,100 35,35"
          fill="var(--color-primary-100)" />
      </svg>

      <svg className="octagon octagon__small octagon--cluster__bottom" viewBox="0 0 200 200">
        <polygon points="100,10 165,35 190,100 165,165 100,190 35,165 10,100 35,35"
          fill="var(--color-accent-100)" />
      </svg>
    </div>
  )

}