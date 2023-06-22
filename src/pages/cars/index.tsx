import Link from 'next/link';

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
        <div key={id}>
          <Link key={id} href={`/cars/${id}`}>
            {id}
          </Link>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/cars.json');
  const data = await res.json();

  return {
    props: { carIds: data },
  };
}
