import CarLink from '@/pages/cars/CarLink';

type Props = {
  carIds: string[];
}

export default function Cars({ carIds }: Props) {
  return (
    <>
      <h1>
        Cars list
      </h1>
      {carIds.map((id) => (
        <CarLink key={id} id={id}/>
      ))}
    </>
  );
}

/* SSG */
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/cars.json');
  const data = await res.json();

  return {
    props: { carIds: data },
  };
}
